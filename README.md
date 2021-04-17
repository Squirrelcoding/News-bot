# News-bot
Publish and delete articles on your discord server! Must be ran client side.

# Upcoming Updates in Alpha v1.3
- Adding Anonymous option to dashboard

# Added features in Alpha v1.2
- Added a dashboard! Check it out [here!](https://github.com/Squirrelcoding/Newsbot-dashboard)
- Added an anonymous author feature
- Added date to article


# More info
Read the [documentation on the official website!](https://www.softsquirrel.tk/docs/newsbot.html)


# Using the Discord bot
For now you have to read the code and set up everything including Firebase. There will be an upcoming `!init` function that will create a Firebase collection with a document including all the values. Instructions will come soon!


# a little tree to help navigating
```
├── README.md 
├── bot     
│   ├── commands
│   │   ├── add-remove 
│   │   │   ├── add.js 
│   │   │   └── remove.js 
│   │   ├── article-functions 
│   │   │   ├── delete.js 
│   │   │   ├── get.js  
│   │   │   └── list.js 
│   │   ├── getArticle.js 
│   │   ├── new.js 
│   │   ├── other 
│   │   │   └── verify.js 
│   │   └── publish.js 
│   └── index.js 
├── package.json 
└── server 
    └── server.js 
```
