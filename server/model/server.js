const express = require('express')
const mongoose = require('mongoose')
const app = express();
const fs = require("fs");
const { promisify } = require('util');
const pipeline = promisify(require("stream").pipeline)

app.use(express.json({limit: "50mb", extended: false, parameterLimit:50000}));
app.use(express.urlencoded({limit: "50mb", extended: false, parameterLimit:50000}));

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const schemaMongo = {
    images: [{idfile:Number,sourceBase64:String}],
    name: String,
    owner: String,
    address: String,
    location: [String],
    bedType: String,
    landMark: String,
    price: Number,
    nearbyLocation: String,
    description: String,
    shortDetail: String,
    district: String,
    status: String
}


mongoose.connect('mongodb://localhost:27017/uploads', options)
.then(()=> console.log("connect to Db"))
.catch(err => console.log("Error"))


const Hotel = mongoose.model("test",new mongoose.Schema(schemaMongo),'hotels')

// const kitty = new Hotel({ name: 'Name10' , ages : 20})


// kitty.save().then(() => console.log('meow'))

app.get('/',(req,res)=>{
    res.json({message: 'ok'})
})


//query data
app.get('/cat/:id' , (req,res)=>{
    const {id} = req.params;
    Hotel.find({name:id})
    .then(data => res.json(data||{}))
    .catch((error)=>
     res.statusCode(400).json({message:'some thing wrong!'}))
})

//  create new hotel
app.post('/uploadData',(req,res)=>{

         
      console.log(req.body);
     const { images,nameHotel,owner,address,location,bedType,price,shortDetail,nearbyLocation,district,status} =req.body

    const newHotel = new Hotel({
        images: images,
            name : nameHotel,
            owner : owner ,
            address : address ,
            location : location,
            bedType :bedType ,
            nearbyLocation:nearbyLocation,
            price : price,
            shortDetail : shortDetail,
            district: district,
            status: status
    
    })
    //  console.log(newHotel);
    newHotel.save().then(()=>console.log(" success"))
    
      res.json({massage: "send complete"})
    
})


//update information hotel
app.post('/updateHotel',(req,res)=>{
    const {uniqueId, images,nameHotel,owner,address,location,bedType,price,shortDetail,district,status ,nearbyLocation} =req.body

    
    //  console.log(Nearbylocation);
        Hotel.findByIdAndUpdate({"_id":uniqueId}        // index
        ,{   images: images,
            name : nameHotel,
            owner : owner ,
            address : address ,
            location : location,
            bedType :bedType ,
            nearbyLocation:nearbyLocation,
            price : price,
            shortDetail : shortDetail,
            district: district,
            status: status
         }                              
        ,{ useFindAndModify: false })                   //Option
        .then(data => res.json({msg:"update compelte"}))
            .catch((error)=>
            res.statusCode(400).json({message:'some thing wrong!'}))

})


//
app.get('/loadPicture/:owner',(req,res)=>{
    const {owner} = req.params;
    
    Hotel.find({owner:owner}) //status post
    .then(data => res.json(data||{}))
    .catch((error)=>
     res.statusCode(400).json({message:'some thing wrong!'}))
 
})


app.get('/loadViewhotel/:idHotel' , (req,res)=>{
    const {idHotel} = req.params;
    //  console.log(idHotel)
    Hotel.find({_id:idHotel})
    .then(data => res.json(data||{}))
    .catch((error)=>
     res.statusCode(400).json({message:'some thing wrong!'}))
})


app.get('/deleteHotel/:idHotel' , (req,res)=>{
    const {idHotel} = req.params;
    // console.log(idHotel)
    Hotel.deleteOne({_id:idHotel})
    .then(data => res.json({msg:"Delete compelte"}))
    .catch((error)=>
     res.statusCode(400).json({message:'some thing wrong!'}))
})


app.listen(8000,()=>console.log(`ok`))