var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

//set up template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

//fire controllers
todoController(app);

//listen to port
app.set('port', 3000);
app.listen(app.get('port'));
console.log("Listening on port " + app.get('port'));
