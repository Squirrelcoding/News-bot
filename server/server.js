const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('views'));

app.get('/', (req, res) => {
  res.render('index')
});

app.listen(3000, () => {
  console.log('server started');
});