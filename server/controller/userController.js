import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { jwtSecret } from "../config/jwtConfig.js";
import User from '../model/userModel.js';
import { isBlank, logError } from '../util/util.js';

const usrFieldProjection = {
    __v: false,
    //_id: false,
    password: false,
    signupDate: false,
};

let create = (req, res) => {
    let { id, password, role } = req.body;
    //console.log("create ", req.body, id, password, role)
    if (!id || !password)
        return res.status(422).json(logError('Invalid user registration info.'));
    role = isBlank(role) ? 'user' : (role === "admin" || role === 'user') ? role : 'user';

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) return res.status(400).json(logError(err));

            var newUser = new User({
                id,
                password: hash,
                role,
            })
            // Save User in the database
            User.init()
                .then(function () { // avoid dup by wait until finish building index
                    newUser.save()
                        .then(user => {
                            return res.json({
                                success: true, message: 'User Registered',
                                user: newUser.toNewRegisterJSON()
                            });
                        }).catch(err => {
                            return res.status(400).json(logError(err));
                        });
                });
        });
    })
};

let checkLogon = (req, res) => {
    const { id, password } = req.body;

    if (!id || !password)
        return res.status(422).json(logError("Required fields"));
    else {
        User.findOne({ id: id })
            .then(user => {
                if (!user) {
                    return res.status(404).json(logError(err || "Not found username"));
                }
                else {
                    if (user.validPassword(password)) {
                        return res.json({ user: user.toAuthJSON() })
                    }
                    else {
                        return res.status(401).json(logError("-Invalid credential"))
                    };
                }
            })
            .catch(err => res.status(401).json(logError(err)))
    }
}
// let list = (req, res) => {
//     User.find({}, usrFieldProjection)
//         // User.find({isDeleted:false}, usrFieldProjection) // not show deleted
//         .then(users => {
//             return res.json(users);
//         }).catch(err => {
//             return res.status(500).json(logError(err));
//         });
// };

// let get = (req, res) => {
//     User.findById(req.params.userId)
//         .then(user => {
//             if (!user) {
//                 return res.status(404).json(logError("User not found with id " + req.params.userId));
//             }
//             else return res.json({ user: user.toProfileJSON() });
//         }).catch(err => {
//             return res.status(404).json(logError(err));
//         });
// };

// let deletePermanent = (req, res) => {
//     User.findByIdAndRemove(req.params.userId)
//         .then(user => {
//             if (!user) {
//                 res.status(404).json(logError("User not found with id " + req.params.userId));
//             }
//             else return res.json({ success: true, message: "User deleted successfully!" })
//                 ;
//         }).catch(err => res.status(404).json(logError(err)))
// };

const validateToken = (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = (authHeader.split(' ')[1]).trim();
        try {
            var decode = jsonwebtoken.verify(token, jwtSecret);
            return res.json(decode);
        }
        catch (err) {
            return res.status(422).json(logError(err));
        }
    }
    else res.status(404).json(logError("Not found authorized header"));
};

export {
    create,
    checkLogon,
    // list,
    // get,
    // deletePermanent,
    validateToken
}