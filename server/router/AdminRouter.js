import express from "express";
import { getHotelForAdmin, getPopup, accept, delHotel } from "../controller/adminController.js";
import { jwtPassport, isInRole } from '../util/jwt-passport.js';
let router = express.Router();
let auth = jwtPassport();
router.use(auth.initialize());
router.get('/getAllData/', auth.authenticate(), isInRole(2), getHotelForAdmin);
router.post('/popup', auth.authenticate(), isInRole(2), getPopup);
router.post('/accept/', auth.authenticate(), isInRole(2), accept);
router.post('/del/', auth.authenticate(), isInRole(2), delHotel);

export default router;