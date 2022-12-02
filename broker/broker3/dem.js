const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const app=express();
var bodyParser = require('body-parser')
const fetch = require("node-fetch");

const connection=mongoose.connect('mongodb://localhost:27017/broker')
.then(()=>{
    console.log('Mongo is connected');
})
.catch((err)=>{
    console.log(err);
})

app.use(cors())
app.use(express.json())

app.use((req,res,next)=>{
    console.log(req.session);
    next();
})

var portnum=8888;

var testarr={};

app.get('/healthcheck',(req,res)=>{
    res.sendStatus(200);
})


app.post('/api/producer',(req,res)=>{

    var name=req.query.testtopic;
    const {message}=req.body; 
    console.log('message',message);
    console.log('name',name);

    var establishedModels = {};
    function createModelForName(name) {
        if (!(name in establishedModels)) {
            try{
            var Any = new mongoose.Schema({ message : {type: String }});
            establishedModels[name] = mongoose.model(name, Any);
            }
            catch(error){
                establishedModels[name] = mongoose.model(name);                
            }
        }
        return establishedModels[name];
    
    }
    console.log(establishedModels);

    var Model = createModelForName(name); // Create the model.
    var model = Model({message}); // Create a model instance.
    model.save(function (err) { // Save
        if (err) {
            console.log(err);
        }
    });    
    
    console.log('arrayyy',testarr);

    for(port in testarr[name])
    {
        // console.log('port numbers',testarr[name][port]);
        try{
            fetch(`http://localhost:${testarr[name][port]}/message?mess=${message}`)
            .then(data => console.log(data));
        }
        catch{
            return null;
        }

    }


    console.log('added..');
    res.send('done');
})


app.get('/portmessage',(req,res)=>{

    const portnum=req.query.portnum;
    const testtopicname=req.query.testtopic;
    console.log(portnum,testtopicname);
    if(!(testtopicname in testarr))
    {
        testarr[testtopicname]=[]
        testarr[testtopicname].push(parseInt(portnum));
    }
    else{
        testarr[testtopicname].push(parseInt(portnum));
    }
    console.log('array',testarr);

    res.send('ok')
})


app.listen(5001,()=>{
    console.log('PORT NUMBER 5001 HAS STARTED');
})