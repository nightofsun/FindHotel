import express from 'express';
import { getPageFilter, getDetail } from '../controller/hotelController.js';

let router = express.Router();

router.get('/filter/:district/:bed/:lowprice/:highprice/:landmark/:searchkey/:page', getPageFilter);
router.get('/detail/:id', getDetail);

export default router;