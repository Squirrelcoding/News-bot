//not copied and pasted from ../add-remove/remove.js

const _ = require('lodash')
exports.run = async function (msg, args, db, admin) {
  var ref = await db.collection("Test").doc("articles");
  var doc = await ref.get();
  var allArticles = doc.data().allArticles;
  var length = 1 + Number(_.max(Object.keys(allArticles), o => allArticles[o] ));
  var removedArticle = args[0]
  console.log({
    a: removedArticle,
    b: length
  })

  var list = doc.data().list;
  var length2 = 1 + Number(_.max(Object.keys(list), o => list[o] ));
  for (var a=0;a<length2;a++){
    const FieldValue = admin.firestore.FieldValue
    if (list[a][a] == args[0]) {
      await ref.set({
        list: {
          [a]: FieldValue.delete()
        }
      }, {merge:true})
    }
    else if (a==length2) {
      msg.channel.send("Failed to find article '" + args[0] + "' in list.")
    }
  }


  for (var i=0;i<length;i++) {
    console.log(allArticles[i])
    console.log(i)

    if (allArticles[i].id == removedArticle) {
      console.log({
        a: i,
        b: removedArticle,
        c: length
      })
      const FieldValue = admin.firestore.FieldValue
      await ref.set({
        allArticles: {
          [i]: FieldValue.delete()
        }
      }, {merge:true})
      return msg.channel.send("Successfully removed article!")
    }
    else {
      console.log("Failed to find article.")
      continue;
    }
  }
}