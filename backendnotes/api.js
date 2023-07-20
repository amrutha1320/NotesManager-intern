const express=require('express');
const url=require('url');
const cors=require('cors');

const {MongoClient}=require('mongodb');
const mongourl='mongodb://127.0.0.1:27017';
const client=new MongoClient(mongourl);
const dbName='Ammu';
var api=express()
api.use(cors())
api.get('/',function(request,response){
    response.send("API server is online")
})
api.get('/insertnotes',async function(request,response){
    urldata=url.parse(request.url,true);
    var notes=urldata.query.notes;
    var owner=urldata.query.owner;
    console.log(notes,owner);
    await client.connect();
    console.log('connected with mongodb server');
    const db=client.db(dbName);;
    const collection=db.collection('expressnotes');
    const result=await collection.insertOne({'notes':notes,'owner':owner});
    console.log(result);
    response.json({status:'success'});
})
api.get('/newregistration',async function(request,response){
    urldata=url.parse(request.url,true);
    var name=urldata.query.name;
    var mobile=urldata.query.mobile;
    var password=urldata.query.password;
    var email=urldata.query.email;
    var org=urldata.query.org;
    console.log(name,mobile,password,email,org);
    await client.connect();
    console.log('connected with mongodb server');
    const db=client.db(dbName);;
    const collection=db.collection('expressregister');
    const result=await collection.insertOne({'name':name,'email':email,'mobile':mobile,'password':password,'org':org});
    console.log(result);
    response.json({status:'success'});
})
api.get('/verifylogin',async function(request,response){
    urldata=url.parse(request.url,true);
    var username=urldata.query.username;
    var password=urldata.query.password;
    console.log(username,password);
    await client.connect();
    console.log('connected to mongodb server');
    const db=client.db(dbName);
    const collection=db.collection('expressregister');
    const result=await collection.find().toArray();
    console.log(result);
    var flag=0;
    for(let item of result){
        console.log(item);
        if(item['mobile']==username && item['password']==password){
        console.log('valid details')
        flag=1;}
    }
    if (flag==0)
    {
        response.json({status:'failure'});
    }
    else{
        response.json({status:'success'});

    }
})

api.get('/viewnotes',async function(request,response){
    await client.connect();
    console.log('connected to mongodb server');
    const db=client.db(dbName);
    const collection=db.collection('expressnotes');
    const result=await collection.find({}).toArray();
    console.log(result);
    response.json({status:result});
})
api.get('/viewusernotes',async function(request,response){
    urldata=url.parse(request.url,true);
    var username=urldata.query.owner;
    console.log(username);
    await client.connect();
    console.log('connected to mongodb server');
    const db=client.db(dbName);
    const collection=db.collection('expressnotes');
    const result=await collection.find({'mobile':username}).toArray();
    console.log(result);
    response.json({status:result});
})
api.listen(2000,function(){
    console.log('API server Online');
})