const Discord = require('discord.js');
const client = new Discord.Client();
const data = require('../data.json');

const admin = require('firebase-admin');
const _ = require('lodash')

const serviceAccount = data.key
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://poopnet-4fb22.firebaseio.com"
});
const db = admin.firestore();

client.on('ready', () => {
  console.log("Signed in as " + client.user.username);
});

const prefix = "!"

client.on('message', msg => {
  const args = msg.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
  const regex = /{(.+?)}/g;
  const arguments = [];
  var string = msg.content
  while (match = regex.exec(string)) arguments.push(match[1]);

  if (command == "new") {
    var newArticle = require('./commands/new.js');
    newArticle.run(db, msg, arguments);
  }
      
  
})


client.on('message', msg => {
  const args = msg.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
  if (command == "add") {
    const add = require('./commands/add-remove/add.js');
    add.run(msg, args, db);
  }
  if (command == "test") {
      const test = require('./commands/other/verify.js');
      test.run(args, db, msg)
  }
  if (command == "date") {
    var publish = require('./commands/publish.js');
    publish.run(msg, db, admin)
  }
  if (command == "help") {
    msg.channel.send("‌n‌e‌w <title> <url> <des> <day> <hour> <am-pm>")
  }
  if (command == "remove") {
    const remove = require('./commands/add-remove/remove.js')
    remove.run(msg, args, db, admin)
  }
  if (command == "delete") {
    const deleteArticle = require('./commands/article-functions/delete.js')
    deleteArticle.run(msg, args, db, admin)    
  }
  if (command == "list") {
    const list = require('./commands/article-functions/list.js');
    list.run(msg, db)
  }
  if (command == "get") {
    const get = require('./commands/article-functions/get.js');
    get.run(msg, db, args)
  }
});


client.login(data.discordToken)