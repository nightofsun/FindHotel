import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { jwtSecret } from '../config/jwtConfig.js';
import * as mongooseDef from 'mongoose';
let mongoose = mongooseDef.default;

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: [true, "ID is required"],
        unique: [true, "Must be uniqued ID"],
    },
    password: { type: String, required: true, minlength: [40] },
    role: { type: String, required: true, default: 'user' }
})

userSchema.methods.validPassword = function (txtPassword) {
    return bcrypt.compareSync(txtPassword, this.password);
}

userSchema.methods.generateJWT = function () {
    const expiresIn = 7200; // 2 hours
    return {
        token: jsonwebtoken.sign({
            _id: this._id, id:
                this.id, role: this.role
        },
            jwtSecret, { expiresIn }),
        expiresIn: expiresIn
    }
}
userSchema.methods.toAuthJSON = function () {
    let genJWT = this.generateJWT();
    return {
        _id: this._id,
        id: this.id,
        role: this.role,
        token: "bearer " + genJWT.token,
        expiresIn: genJWT.expiresIn,
    };
};
userSchema.methods.toNewRegisterJSON = function () {
    return {
        _id: this._id,
        id: this.id,
        role: this.role,
    };
};
userSchema.methods.toProfileJSON = function () {
    return {
        _id: this._id,
        id: this.id,
        role: this.role,
        signUpDate: this.signUpDate,
    };
};

let User = mongoose.model('User', userSchema, 'users');
export default User;