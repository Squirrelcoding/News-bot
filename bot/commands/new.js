//functions
var _ = require('lodash')
function appendData(dic, value) {
  var maxKey = Number(_.max(Object.keys(dic), o => dic[o] ));
  var newKey = maxKey + 1
	dic[newKey] = value
  return {
    dictonary: dic[newKey],
    value: value
  }
}

function randint(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getNewestKey(dic) {
  var maxKey = Number(_.max(Object.keys(dic), o => dic[o] ));
  var newKey = maxKey + 1
  return newKey
}

class Article {
  constructor(title, url, des, day, time, am_pm) {
    this.title = title;
    this.url = url;
    this.des = des; //Des = Description/main paragraph
    this.day = day;
    this.time = time;
    this.am_pm = am_pm
  }
}


exports.run = async function(db, msg, args) {
  var article = new Article(args[0], args[1], args[2], args[3], args[4], args[5]);
  var ref = await db.collection('Test').doc('articles');
  var doc = await ref.get();
  var newArticle = "article" + randint(1, 99999)
 /* await ref.set({
    [newArticle]: {
      title: article.title,
      imgURL: article.url,
      des: article.des,
      day: article.day,
      time: article.time,
      am_pm: article.am_pm
    }
  })*/
  var allArticles = doc.data().allArticles; 
  var key = getNewestKey(allArticles, _);
  console.log(appendData(allArticles, {
    title: article.title,
    imgURL: article.url,
    des: article.des,
    day: article.day,
    time: article.time,
    am_pm: article.am_pm,
    id: newArticle
  }, _))
  var queue = doc.data().queue;
  //Add Article to queue
  



  appendData(queue, {
    id: newArticle,
    time: {
      day: article.day,
      time: article.time,
      am_pm: article.am_pm
    },
    article: key,
    passed: false
  })
  await ref.set({
    allArticles, queue
  })
}