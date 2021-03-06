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

const verify = require('./other/verify.js');

exports.run = async function(db, msg, args) {
//  var article = new Article(args[0], args[1], args[2], Number(args[3]), Number(args[4]), args[5]);
  var article = {
    title: args[0],
    url: args[1],
    des: args[2],
    day: Number(args[3]),
    time: Number(args[4]),
    am_pm: args[5],
    author: msg.author.username,
    anonymous: args[6] //was going to do Boolean(args[6]) but its set to true due to it being a non-empty string and im too lazy to fix that
  }

  var ref = await db.collection('Test').doc('articles');
  var doc = await ref.get();
  var newArticle = "article" + randint(1, 99999)

  var allArticles = doc.data().allArticles; 
  var key = getNewestKey(allArticles, _);
  console.log(appendData(allArticles, {
    title: article.title,
    author: article.author,
    imgURL: article.url,
    des: article.des,
    day: article.day,
    time: article.time,
    am_pm: article.am_pm,
    id: newArticle,
    published: false,
    anonymous: article.anonymous
  }, _))
  var list = doc.data().list;
  appendData(list, {[Number(getNewestKey(list))]: newArticle})
  var queue = doc.data().queue;
  //Add Article to queue
  


  const whitelist = doc.data().whitelist;
  const main = doc.data().main
  appendData(queue, {
    id: newArticle,
    time: {
      day: article.day,
      time: article.time,
      am_pm: article.am_pm
    },
    article: key,
    published: false
  })
  if (await verify.run(args, db, msg) == true || doc.data().main == msg.author.id) {
    await ref.set({
      allArticles, queue, whitelist, list, main
    })
    msg.delete({ timeout: 1 }).then(() => {
      console.log("deleted message")
    })
  }
  else {
    msg.delete({ timeout: 1 })
    return msg.channel.send("Invalid Permissions")
  }
}