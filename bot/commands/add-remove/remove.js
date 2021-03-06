const _ = require('lodash')
exports.run = async function (msg, args, db, admin) {
  var ref = await db.collection("Test").doc("articles");
  var doc = await ref.get();
  var whitelist = doc.data().whitelist;
  var length = 1 + Number(_.max(Object.keys(whitelist), o => whitelist[o] ));
  var removedUser = args[0]
  for (var i=0;i<length;i++) {
    if (whitelist[i] == removedUser) {
      console.log({
        a: i,
        b: removedUser,
        c: length
      })
      const FieldValue = admin.firestore.FieldValue
      if (msg.author.id == doc.data().main) {
        await ref.set({
          whitelist: {
            [i]: FieldValue.delete()
          }
        }, {merge:true})
        return msg.channel.send("Successfully removed user: " + args[0])
      }
      else {
        return msg.channel.send("Invalid Permissions! Only the main admin can add or remove permitted users!")
      }
    }
    else {
      continue;
    }
  }
}