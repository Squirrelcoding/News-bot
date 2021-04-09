const _ = require('lodash')
function appendData(dic, value) {
  var maxKey = Number(_.max(Object.keys(dic), o => dic[o] ));
  var newKey = maxKey + 1
	dic[newKey] = value
  return {
    dictonary: dic[newKey],
    value: value
  }
}

exports.run = async function(msg, args, db) {
  var addedUser = args[0];
  const ref = await db.collection("Test").doc("articles");
  const doc = await ref.get();
  var whitelist = doc.data().whitelist;
  if (msg.author.id == doc.data().main) {
    appendData(whitelist, Number(addedUser));
    await ref.update({
      whitelist
    })
    msg.channel.send("Successfully added user:" + args[0])
  }
  else {
    msg.channel.send("Invalid Permissions! Only the main admin can add or remove permitted users!")
  }
}
//738517191460126760