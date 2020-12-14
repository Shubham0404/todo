const express = require('express');
const app = express();
const port = 3080;

const MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

app.use(express.json());
app.use(express.urlencoded());

MongoClient.connect(url,function(err,db){
    if(err) throw err;
    console.log("Database Created");
    var dbo = db.db("todoDb");
    
    // dbo.createCollection("tasks",function(err,res){
    //     if(err) throw err;
    //     console.log("Collection Tasks Created");
    // });

    // var task = {task_id : 2, title: "Second Test Task", timestamp: new Date(), subtasks : "{2,3}", status:"active"};

    // dbo.collection("tasks").insertOne(task,function(err,res){
    //     if(err) throw err;
    //     console.log("New Task Inserted");
    // });

    dbo.collection("tasks").findOne({},function(err,result){
        if (err) throw err;
        console.log("Result title = "+result.title);
    });

    dbo.collection("tasks").find({}).toArray(function(err,result){
        if(err) throw err;
        console.log("All data is as below");
        console.log(result);
    });

    db.close();
});
// var task = {title: "First Test Task", timestamp: "Some Random Val", subtasks : "{2,3}",statuts:"active"}
// dbo.collection("tasks").insertOne(task,function(err,res){
//     if(err) throw err;
//     console.log("First Task Inserted");
// });
 
app.get('/',(req,res) => {
    res.send("Hello World!")
})

app.post('/saveTask',(req,response)=> {
    // response.send(req.body);
    // response.send("Api hit");
    MongoClient.connect(url,function(err,db){
        if(err) throw err;
        console.log("Database Created");
        var dbo = db.db("todoDb");
        var task = {title: req.body.title, timestamp: new Date(), subtasks : "{2,3}", status:req.body.status};
        dbo.collection("tasks").insertOne(task,function(err,res){
            if(err) throw err;
        });
        response.send("New Task Added Successfully");
    });
});

app.post('/updateTask',(request,response)=>{
    MongoClient.connect(url,function(err,db){
        if(err) throw err;
        var dbo = db.db("todoDb");
        var id = request.body.id;
        // response.send(id);
        var newvalues = { title : 'New Updated Title'};
        dbo.collection("tasks").updateOne(id,newvalues,function(err,res){
            if(err) throw err;
            console.log("Task Updated Successfully");
        });
        // db.close();
        response.send("1 document updated");
    });
});

app.post('/saveSubTask',(req,res)=>{
    res.send("Sub task added")
})

app.listen(port,()=>{
    console.log("Demo is working")
})