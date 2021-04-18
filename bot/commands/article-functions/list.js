const _ = require('lodash')
exports.run = async function(msg, db, args) {


  if (args[0] == 'articles') {
    var ref = await db.collection("Test").doc("articles");
    var doc = await ref.get();

    var list = doc.data().list;
    var length = 1 + Number(_.max(Object.keys(list), o => list[o] ));

    for (var i=1;i<length;i++) {
      var listID = list[i][i]
      console.log(listID)
        msg.channel.send(JSON.stringify(listID).replace(/"/g, ''))
    } 

  }
  else if (args[0] == 'whitelist') {
 
    var ref = await db.collection("Test").doc("articles");
    var doc = await ref.get();

    var list = doc.data().whitelist;
    var length = 1 + Number(_.max(Object.keys(list), o => list[o] ));

    for (var i=0;i<length;i++) {
        msg.channel.send(JSON.stringify(list[i]))
    } 

  } 





}