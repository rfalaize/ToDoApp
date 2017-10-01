var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to mongo db (mLab test db)
//mongoose.connect('mongodb://<user>:<password>@ds013926.mlab.com:13926/rfalaize_todoapp');
//create schema (blue print)
var todoSchema = new mongoose.Schema({
    item: String
});
//create a model type
var Todo = mongoose.model('Todo', todoSchema);
//create an object of type Todo, and save it in mongodb
/*
var itemOne = Todo({
    item: 'buy flowers'
}).save(function(err) {
    //callback function fired on save event
    if (err) throw err;
    console.log('item saved');
});

//using nodejs server data
var data = [{item: 'get milk'},{item: 'walk dog'},{item: 'book flight'}];
*/

//define middleware to run in the post request
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

module.exports = function(app) {
    //define handlers for the different requests
    app.get('/todo', function(req, res) {
        console.log('Server received new GET request. body=' + req.body);
        /*
        res.render('todo', {
            todos: data
        });
        */
        //find all the items in the collection
        Todo.find({}, function(err, data) {
            if (err) throw err;
            res.render('todo', {
                todos: data
            });
        });
    });
    app.post('/todo', urlencodedParser, function(req, res) {
        console.log('Server received new POST request');
        //data.push(req.body);
        //get data from the view and add it to mongodb
        var newTodo = Todo(req.body).save(function(err, data) {
            if (err) throw err;
            res.json(data);
            console.log('item saved in mongodb');
        });
    });
    app.delete('/todo/:item', function(req, res) {
        console.log('Server received new DELETE request. item=' + req.params.item);
        /*
        data = data.filter(function(todo) {
            return todo.item.replace(' ', '-') !== req.params.item;
        });
        return res.json(data);
        */
        //delete the item from mongodb
        Todo.find({
            item: req.params.item.replace(/\-/g, " ")
        }).remove(function(err, data) {
            if (err) throw err;
            res.json(data);
        });
    });
};
