import express from 'express';
import {deleteHotel, loadPicture, loadViewhotel, uploadData, updateHotel} from '../controller/ownerController.js';
import { jwtPassport, isInRole } from '../util/jwt-passport.js';

let ownerRouter = express.Router();
let auth = jwtPassport();
ownerRouter.use(auth.initialize());
ownerRouter.post('/uploadData', auth.authenticate(), isInRole(1),uploadData);
ownerRouter.post('/updateHotel', auth.authenticate(), isInRole(1),updateHotel);
ownerRouter.get('/loadPicture/:owner', auth.authenticate(), isInRole(1),loadPicture);
ownerRouter.get('/loadViewhotel/:idHotel', auth.authenticate(), isInRole(1),loadViewhotel);
ownerRouter.get('/deleteHotel/:idHotel', auth.authenticate(), isInRole(1),deleteHotel);

export default ownerRouter;