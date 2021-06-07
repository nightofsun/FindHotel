import Hotel from '../model/hotelModel.js';
const prodFeildProjection = {
    __v: false
};


const getUserHotel = (req, res) => {
    const { id } = req.params;
    Hotel.find({ owner: id })
        .then(data => {
            let temp = []
            data.map(data=>{
                let a = []
                let d = {
                    _id: data._id,
                    owner: data.owner,
                    name: data.name,
                    address: data.address,
                    location: data.location,
                    bedType: data.bedType,
                    nearbyLocation: data.landMark,
                    price: data.price,
                    description: data.description,
                    shortDetail: data.shortDetail,
                    district: data.district,
                    status: data.status
                };
                data.images.map((img,key)=>{
                    a.push({idfile:key, sourceBase64: img});
                })
                
                d.images = a;
                //console.log(d);
                temp.push(d);
            })
            // console.log(temp)
            res.json(temp || {})
        })
        .catch((error) =>
            res.statusCode(400).json({ message: 'some thing wrong!' }))
};

const uploadData = (req, res) => {


    console.log(req.body);
    const { images, nameHotel, owner, address, location, bedType, price, shortDetail, nearbyLocation, district, status, description } = req.body
    const img = [];
    images.map(data => {
        img.push(data.sourceBase64);
    })
    const newHotel = new Hotel({
        images: img,
        name: nameHotel,
        owner: owner,
        address: address,
        location: location,
        bedType: bedType,
        landMark: nearbyLocation,
        price: price,
        shortDetail: shortDetail,
        description: description,
        district: district,
        status: status

    })
    //  console.log(newHotel);
    newHotel.save().then(() => { console.log(" success"); res.json({ massage: "send complete" }) })
};

const updateHotel = (req, res) => {
    const { uniqueId, images, nameHotel, owner, address, location, bedType, price, shortDetail, district, status, nearbyLocation, description } = req.body
    const img = [];
    images.map(data => {
        img.push(data.sourceBase64);
    })

    //  console.log(Nearbylocation);
    Hotel.findByIdAndUpdate({ "_id": uniqueId }        // index
        , {
            images: img,
            name: nameHotel,
            owner: owner,
            address: address,
            location: location,
            bedType: bedType,
            landMark: nearbyLocation,
            price: price,
            shortDetail: shortDetail,
            district: district,
            status: status,
            description: description
        }
        , { useFindAndModify: false })                   //Option
        .then(data => res.json({ msg: "update compelte" }))
        .catch((error) =>
            res.statusCode(400).json({ message: 'some thing wrong!' }))

}

const loadPicture = (req, res) => {
    const { owner } = req.params;
    Hotel.find({ owner: owner }) //status post
    .then(data => {
        let temp = []
        data.map(data=>{
            let a = []
            let d = {
                _id: data._id,
                owner: data.owner,
                name: data.name,
                address: data.address,
                location: data.location,
                bedType: data.bedType,
                nearbyLocation: data.landMark,
                price: data.price,
                description: data.description,
                shortDetail: data.shortDetail,
                district: data.district,
                status: data.status
            };
            data.images.map((img,key)=>{
                a.push({idfile:key, sourceBase64: img});
            })
            
            d.images = a;
            //console.log(d);
            temp.push(d);
        })
        // console.log(temp)
        res.json(temp || {})
    })
        .catch((error) =>
            res.statusCode(400).json({ message: 'some thing wrong!' }))
}

const loadViewhotel = (req, res) => {
    const { idHotel } = req.params;
    //  console.log(idHotel)
    Hotel.find({ _id: idHotel })
    .then(data => {
        let temp = []
        data.map(data=>{
            let a = []
            let d = {
                _id: data._id,
                owner: data.owner,
                name: data.name,
                address: data.address,
                location: data.location,
                bedType: data.bedType,
                nearbyLocation: data.landMark,
                price: data.price,
                description: data.description,
                shortDetail: data.shortDetail,
                district: data.district,
                status: data.status
            };
            data.images.map((img,key)=>{
                a.push({idfile:key, sourceBase64: img});
            })
            
            d.images = a;
            //console.log(d);
            temp.push(d);
        })
        // console.log(temp)
        res.json(temp || {})
    })
        .catch((error) =>
            res.statusCode(400).json({ message: 'some thing wrong!' }))
}

const deleteHotel = (req, res) => {
    const { idHotel } = req.params;
    // console.log(idHotel)
    Hotel.deleteOne({ _id: idHotel })
        .then(data => res.json({ msg: "Delete compelte" }))
        .catch((error) =>
            res.statusCode(400).json({ message: 'some thing wrong!' }))
}
export{
    getUserHotel,
    uploadData,
    updateHotel,
    loadPicture,
    loadViewhotel,
    deleteHotel
}