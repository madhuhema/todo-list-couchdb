var express = require("express");
var app = express();
var	bodyParser = require("body-parser");
const NodeCouchDb = require('node-couchdb');
const couch = new NodeCouchDb();

app.use( bodyParser() );
app.use( bodyParser.json() ); 
app.use( bodyParser.urlencoded({ extended: false}) );
app.use('/public',express.static(__dirname='public') );
app.use('/controller',express.static(__dirname='app/controller') ); 
app.use('/css',express.static(__dirname='app/css'))
app.post('/task', (req,res)=> {
    const task = req.body;
        couch.insert("task",task).then(({data, headers, status}) => {
            console.log(data,headers,status);
            res.json(data);
        }, err => {
            res.json(err)
        }) 
});
app.get('/tasks', (req,res) => {
    couch.mango("task",{"selector": {}}).then((tasks,headers,status) =>{
        res.json(tasks.data.docs);
    },err => res.json(err)); 
})
app.get('/',(req,res) => {
    res.sendfile(__dirname="app/view/index.html");
});
app.delete('/delete_tasks',(req,res) => {
    couch.del("task", req.body.id,req.body.rev).then(({data, headers, status}) => {
        console.log(data,headers,status);
        res.json(data);
    }, err => {
       res.json(err);
    });
})
app.listen('3000', () => {
    console.log("server started...");
});