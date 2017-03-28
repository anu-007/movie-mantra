const express = require('express');
const randomMovie = require('random-movie');
const bodyParser = require('body-parser');
const path = require('path');
const handlebars = require('handlebars');
const exphbs = require('express-handlebars');

const app = express();

app.engine('handlebars', exphbs({defaultLayout:'index'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'src')));

app.get('/',function(req,res){
  res.render("button");
});

app.get('/movie',function(req,res){
  randomMovie(function(err, movie) {
    var data=movie;
  res.render('first',data);
});
});

app.listen(process.env.PORT ||3000, function () {
  console.log('Example app listening on port 3000!')
});
