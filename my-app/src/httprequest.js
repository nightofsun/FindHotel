import express from 'express';
import bodyParser from 'body-parser';
const ap = express()
ap.use(bodyParser.json());
ap.post('/register', (req, res)=>{
    const id = req.body.id;
    const pass = req.body.pass;
    const call = (data)=>{
        res.json(data);
        res.end("success")
    }
    checkmember(id,pass,call);
})



ap.listen(5000,function(){
    console.log('5000')
})

const MongoClient = require('mongoose');
const uri = "mongodb+srv://dbtest:0819227931ARM@cluster0.y77hs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const config = { useNewUrlParser: true, autoIndex: true };
MongoClient.connect(uri,config)
.then(()=> console.log("connect to Db"))
.catch(err => console.log("Error"))

const student = new MongoClient.Schema({
    id:String,
    pass:String
})

function checkmember(idC,passC,callback)
{
const stuq = MongoClient.model('stu/as',student)
async function gett(){
    
    const gettttt = await stuq
    .find({id:idC.toString()})
    
    //.then(()=> console.log("YES"))
    //.catch(err => console.log("No"))
    //console.log(gettttt.length)
    if(gettttt.length==0)
    {
        addmember(idC,passC)
        console.log("Add ID Success.")
        //status = "0"
        return 'DontHave'
    }
    else
    {
        console.log("Have ID in DataBase.")
        //status = "1"
        return 'Have'
    }

    
    
}
    gett().then((n)=>{callback(n)})
     
    
}


function addmember(idA,passA)
{
    const stuq = MongoClient.model('stu/as',student)
    async function add(){
    const memberAdd = stuq({
        
        id: idA.toString(),
        pass: passA.toString()
        })
    memberAdd.save()
    
    }

    add()
}

