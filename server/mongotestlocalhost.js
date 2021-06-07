const express = require('express')
const ap = express()
// const multer = require('multer')

ap.use(express.json({ limit: "50mb", extended: false, parameterLimit: 50000 }));
ap.use(express.urlencoded({ limit: "50mb", extended: false, parameterLimit: 50000 }));

ap.listen(5000, function () {
    console.log('5000')
})


// const upload = multer();
// ap.post('/del5/',upload.single("files"),async function(req,res){
//     console.log(req.file)
//     //console.log(req.arrayBuffer)
//     //const fileName = req.file.originalname
//     //console.log(req.file.buffer.toString('base64'))
//     res.send(req.file.buffer.toString('base64'))
//     //AddStringBase64_To_mongo(req.file.buffer.toString('base64'))
//     //fs.writeFileSync('stack-abuse-logo-out.jpg', req.file.buffer.toString('base64'));
// })

// ap.post('/del88/', function(req,res){
//     const imgbase6455 = req.body
//     //console.log(imgbase6455)
//     const Arrayimage = []
//     imgbase6455.map(index=>{
//         Arrayimage.push(index.title)
        
//     })
//     AddStringBase64_To_mongo(Arrayimage)
//     getAlldata((a)=>{res.send(JSON.stringify(a));console.log(JSON.stringify(a))})
    
// })
//getAlldata((n)=>{console.log(n)})


const MongoClient = require('mongoose')

const url = 'mongodb://127.0.0.1:27017/asd';
const config = { useNewUrlParser: true, autoIndex: true };
MongoClient.connect(url,config)
.then(()=> console.log("connect to Db"))
.catch(err => console.log("Error"))

var imgaebase64 = new MongoClient.Schema({
    image: [String]
})

var allst = new MongoClient.Schema({
    images: [String],
    name:String,
    id:String,
    status:String
})

const student = new MongoClient.Schema({
    name:String
})

const ids = new MongoClient.Schema({
    idss:String
})



function addmember(idA)
{
    const stuq = MongoClient.model('image',student)
    async function add(){
    const memberAdd = stuq({
        
        id: idA.toString()
        
    })
    memberAdd.save()
    
}

    add()
}

function getAlldata(callback)
{
    const stuq = MongoClient.model('stu/as',allst)
    async function getts(){
        const gettttt = await stuq
        .find({"status":"wait"},function(req,res){
           
            return res
        })
        return gettttt
        
    }
    getts().then((n)=>{callback(n)})
    //console.log(b)
}



// function AddStringBase64_To_mongo(base64Array)
// {
//     //console.log(base64Array)
//     const image64 = MongoClient.model('image9',imgaebase64)
//     async function addImage(){
//     const Add = image64({
        
//         image: base64Array
        
//     })
//     Add.save()
    
// }

// addImage()
// }

ap.get('/getAllData/',(req,res)=>{

    setTimeout(()=>{
        getAlldata((n)=>{res.send(n)})  
    },1500)
})

ap.post('/popup',(req,res)=>{
    console.log(req.body.id)
    const idreal = req.body.id.toString()
    const stuq = MongoClient.model('stu/as',allst)
    async function getts(){
        const gettttt = await stuq
        .find({id:idreal},function(req,res){
           //console.log(req)
            return res
        })
        return gettttt
        //console.log(gettttt)
        
    }
    getts().then((n)=>{res.send(n)})
    
    
    
    
})

/*ap.post('/del/',(req,res)=>{
    const delid = req.body.id

    console.log(delid)
    //const dellByid1 = MongoClient.model('image555',allst)
    const dellByid2 = MongoClient.model('stu/as',allst)
    
    
    async function getts(){
        /*const gettttt = await dellByid1
        .deleteOne({id:delid},function(req,res){   
        })
        const gettttt2 = await dellByid2
        .deleteOne({id:delid},function(req,res){   
        })
    }
    getts()
    
})*/

ap.post('/accept/',(req,res)=>{
    const delid = req.body.id

    console.log(delid)
    //const dellByid1 = MongoClient.model('image555',allst)
    const dellByid2 = MongoClient.model('stu/as',allst)
    
    
    async function getts(){
        /*const gettttt = await dellByid1
        .deleteOne({id:delid},function(req,res){   
        })*/
        const gettttt2 = await dellByid2
        .updateOne({id:delid},{
            $set : {status:"public"}
        })
    }
    getts()
    
})
ap.post('/del/',(req,res)=>{
    const delid = req.body.id

    console.log(delid)
    //const dellByid1 = MongoClient.model('image555',allst)
    const dellByid2 = MongoClient.model('stu/as',allst)
    
    
    async function getts(){
        /*const gettttt = await dellByid1
        .deleteOne({id:delid},function(req,res){   
        })*/
        const gettttt2 = await dellByid2
        .updateOne({id:delid},{
            $set : {status:"return"}
        })
    }
    getts()
    
})

