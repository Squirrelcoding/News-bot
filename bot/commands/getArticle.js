exports.run = async function(db, msg, number) {
  const ref = await db.collection("Test").doc("articles");
  const doc = await ref.get();
  var article = {
    title: doc.data().title
  }
}