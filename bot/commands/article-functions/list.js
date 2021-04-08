const _ = require('lodash')
exports.run = async function(msg, db) {
  var ref = await db.collection("Test").doc("articles");
  var doc = await ref.get();
  var list = doc.data().list;
  var length = 1 + Number(_.max(Object.keys(list), o => list[o] ));
  for (var i=0;i<length;i++) {
     msg.channel.send(JSON.stringify(list[i]))
  }
}