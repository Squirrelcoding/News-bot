exports.run= async function(msg, db, admin, _) {
  var dateObj = new Date();
  var day = Number(dateObj.getUTCDate());
  var hours = Number(dateObj.getHours());
  var ampm = (hours >= 12) ? "PM" : "AM";
  msg.channel.send(day)
  if (ampm == "PM") {
    hours = 24  - hours
  } 
  msg.channel.send(hours);

  var ref = await db.collection("Test").doc("articles");
  var doc = await ref.get();
  var queue = doc.data().queue;
  
    for (var i = 1; i < Object.keys(queue).length; i++) {
      console.log("under 3: " + i)
      console.log("Length: " + Object.keys(queue).length)
      if (i >= 1){
        var time = {
          pmam: doc.data().queue[i].time.am_pm,
          day: doc.data().queue[i].time.day,
          hour: doc.data().queue[i].time.time
        }
        console.log(time)
        console.log({
          hour: hours,
          ampm: ampm,
          day: day
        })
        if (time.day == "false" && time.time == "false") {
          console.log("false")
          if (time.pmam == "false") {
            var title = doc.data().allArticles[i].title;
            var des = doc.data().allArticles[i].des;
            var imgURL = doc.data().allArticles[i].url;
          
            msg.channel.send("*" + title + "*", {files: ['https://preview.redd.it/gb65gg85gp551.png?width=960&crop=smart&auto=webp&s=7e9a244602de0a9507bf79b6f9ae6eefc91ca932']});
            msg.channel.send(des)


            const FieldValue = admin.firestore.FieldValue
            await ref.set({
              queue: {
                [i]: FieldValue.delete()
              }, 
            }, {merge: true})    
          }
        }

        if (day == time.day && hours == time.hour) {
          console.log("Passed test A")
          if (ampm == time.pmam) {
            console.log("should be deleting article from queue")
            var title = doc.data().allArticles[i].title;
            var des = doc.data().allArticles[i].des;
            var imgURL = doc.data().allArticles[i].url;
          
            msg.channel.send("*" + title + "*", {files: ['https://preview.redd.it/gb65gg85gp551.png?width=960&crop=smart&auto=webp&s=7e9a244602de0a9507bf79b6f9ae6eefc91ca932']});
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