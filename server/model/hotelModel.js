import * as mongooseDef from 'mongoose';
let mongoose = mongooseDef.default;

const hotelSchema = new mongoose.Schema({
    images: [String],
    name: String,
    owner: String,
    address: String,
    location: [String],
    bedType: String,
    landMark: String,
    price: Number,
    status: String,
    description: String,
    shortDetail: String,
    district: String
});
let Hotel = mongoose.model('Hotel', hotelSchema, 'Hotel');
export default Hotel;