const { auth } = require('firebase-admin');
const _ = require('lodash');
exports.run = async function(msg, db, args) {
  var ref = await db.collection("Test").doc("articles");
  var doc = await ref.get();
  var articles = doc.data().allArticles;
  var length = 1 + Number(_.max(Object.keys(articles), o => articles[o] ));
  var found = false;
  for (var i=0; i<length;i++){
    if (articles[i].id == args[0]) {
      var title = doc.data().allArticles[i].title;
      var des = doc.data().allArticles[i].des;
      var imgURL = doc.data().allArticles[i].imgURL;
      var author = doc.data().allArticles[i].author;
      var time = doc.data().allArticles[i].exactTime;
      if (doc.data().allArticles[i].published == true) {
        await msg.channel.send("***" + title + "*** \n", {files: [imgURL]});
        await msg.channel.send(des)
        await msg.channel.send("Author: " + author)
        await msg.channel.send("Date: " + time)
        found = true
      }
      else {
        msg.channel.send("Article exists however it is not published.")
        found = true
      }
    }
    if (i == length-1 && found == false){
      msg.channel.send("No such article: " + args[0])
    }
  }

}