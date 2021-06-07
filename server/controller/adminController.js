import Hotel from '../model/hotelModel.js';
const prodFeildProjection = {
    __v: false
};

const getAlldata = (callback) => {
    Hotel.find({ status: "wait" }).then(hotel => callback(hotel));
}

const getHotelForAdmin = (req, res) => {
    getAlldata((hotel) => {
        res.send(hotel)
    })
}

const getPopup = (req, res) => {
    const idreal = req.body.id.toString();
    Hotel.find({ _id: idreal })
        .then(popup => res.send(popup))
}

const accept = (req, res) => {
    const id = req.body.id;
    //console.log(req.body);
    Hotel.updateOne({ _id: id }, {
        $set: { status: "public" }
    }).then(() => { res.status(200).send("success") })
}

const delHotel = (req, res) => {
    const id = req.body.id;
    //console.log(req.body);
    Hotel.updateOne({ _id: id }, {
        $set: { status: "return" }
    }).then(() => { res.status(200).send("success") })
}
export {
    getPopup,
    getHotelForAdmin,
    accept,
    delHotel
}