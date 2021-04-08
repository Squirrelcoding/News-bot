const _ = require('lodash')
exports.run = async function(args, db, msg) {
  const ref = await db.collection("Test").doc("articles");
  const doc = await ref.get();
  var whitelist = doc.data().whitelist;
  var wl_length = Number(_.max(Object.keys(whitelist), o => whitelist[o] ));
  var length = wl_length + 1;
  var userIncluded = false;
  for (var i=0;i<length;i++) {
    if (whitelist[i] == msg.author.id) {
      userIncluded = true
    }
    else {
      userIncluded = false
    }
  }
  return userIncluded
}