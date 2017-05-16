const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

const app = express();
var db;

app.use(express.static('static'));


/* Get a hello world */
app.get('/api/hello', function (req, res) {
    res.json({"Hello": "World!"});
});


/* Get a list of filtered records */
app.get('/api/bugs', function (req, res) {
    console.log('Query string: ', req.query);
    let filter = {};
    if (req.query.priority) {
        filter.priority = req.query.priority;
    }
    if (req.query.status) {
        filter.status = req.query.status;
    }

    db.collection("bugs").find(filter).toArray(function(err, docs) {
        res.json(docs);
    });
});

app.use(bodyParser.json());

/* Insert a record */ 
app.post('/api/bugs/', function(req, res){
    console.log("Req body:", req.body);
    var newBug = req.body;
    db.collection("bugs").insertOne(newBug, function(err, result){
        var newId = result.insertedId;
        db.collection("bugs").find({_id: newId}).next(function(err, doc){
            res.json(doc);
        });
    });
});

/*Get a single record */
app.get('/api/bugs/:id', function(req, res) {
    db.collection("bugs").findOne({_id:ObjectId(req.params.id)}, function(err, bug) {
        res.json(bug);
    });
});

/* Modify one record, given its Id */
app.put('/api/bugs/:id', function(req,res){
    var bug = req.body;
    console.log("Modifying bugs:", req.params.id, bug);
    var oid = ObjectId(req.params.id);
    db.collection("bugs").updateOne({_id: oid}, bug, function(err, result){
        db.collection("bugs").find({_id: oid}).next(function(err, doc){
            res.send(doc);
        });
    });
});

app.get('*', function(req, res){
    res.sendFile(__dirname + '/static/index.html');
});

// MongoClient.connect('mongodb://localhost/bugsdb', function(err, dbConnection){
//     db = dbConnection;
//     var server = app.listen(80, function() {
//         var port = server.address().port;
//         console.log("Started server at port", port);
//     });
// });

var server = app.listen(80, function() {
      var port = server.address().port;
     console.log("Started server at port", port);
});