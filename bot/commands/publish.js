exports.run= async function(msg, db, admin, _) {
  var dateObj = new Date();
  var day = Number(dateObj.getUTCDate());
  var hours = Number(dateObj.getHours());
  var ampm = (hours >= 12) ? "PM" : "AM";
  if (ampm == "PM") {
    hours = 24  - hours
  } 
  var ref = await db.collection("Test").doc("articles");
  var doc = await ref.get();
  var queue = doc.data().queue;
  
    for (var i = 1; i < Object.keys(queue).length; i++) {
      console.log(i)
      console.log("length:" + Object.keys(queue).length)
      if (i >= 1){
        var time = {
          pmam: doc.data().queue[i].time.am_pm,
          day: doc.data().queue[i].time.day,
          hour: doc.data().queue[i].time.time
        }
        if (time.day == 0 && time.hour == 0) {
          if (time.pmam == 0) {
            console.log(i)
            var title = doc.data().allArticles[i].title;
            var des = doc.data().allArticles[i].des;
            var imgURL = doc.data().allArticles[i].imgURL;
            await msg.channel.send("***" + title + "*** \n", {files: [imgURL]});
            await msg.channel.send(des)
            var passed = doc.data().allArticles[i].published
            doc.data().allArticles[i].published = true;
            var path = 'allArticles.' + i + '.published';
            await ref.update({
              [path]: true
            })
            const FieldValue = admin.firestore.FieldValue
            await ref.set({
              queue: {
                [i]: FieldValue.delete()
              }, 
            }, {merge: true})    
          }
        }

        else if (day == time.day && hours == time.hour) {
          if (ampm == time.pmam) {
            var title = doc.data().allArticles[i].title;
            var des = doc.data().allArticles[i].des;
            var imgURL = doc.data().allArticles[i].url;
            msg.channel.send("***" + title + "*** \n", {files: [imgURL]});
            msg.channel.send(des)


            const FieldValue = admin.firestore.FieldValue
            await ref.set({
              queue: {
                [i]: FieldValue.delete()
              }, 
            }, {merge: true})
          }
        }


      }
  }


}