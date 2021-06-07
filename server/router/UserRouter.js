import express from 'express';
import { jwtPassport } from '../util/jwt-passport.js';
import { create, checkLogon, validateToken } from '../controller/userController.js';

let userRoute = express.Router();
let auth = jwtPassport();

userRoute.post('/register', create);
userRoute.post('/signin', checkLogon);
userRoute.post('/validateToken', validateToken);
// userRoute.get('/user/:userId', get);

export default userRoute;