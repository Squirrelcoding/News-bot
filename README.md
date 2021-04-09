# News-bot
Publish and delete articles on your discord server! Must be ran client side.

# Upcoming Updates
- Will add admin board that will be hosted on localhost

# Added features in inDEV v1.3 / Alpha v1.0
- Added value "main" so ONLY the admin can remove and add permitted users
- Improved `list` command.


# More info
Read the [documentation on the official website!](https://www.softsquirrel.tk/docs/newsbot.html)


# Using the Discord bot
For now you have to read the code and set up everything including Firebase. There will be an upcoming `!init` function that will create a Firebase collection with a document including all the values. Instructions will come soon!


# a little tree to help navigating

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
├── data.json
├── package-lock.json
├── package.json
├── plans.md
└── server
    └── server.js
