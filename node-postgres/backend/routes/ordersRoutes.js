const express = require('express');
const Order = require('../models/orderModel');

const multer = require('multer');
const upload = multer();

const router = express.Router();

//GET ALL ORDERS
router.get('/', async function(req, res, next){
    try{
        const results = await Order.getAllOrders()
        return res.status(200).json(results);
    }catch(err){
        return next(err);
    }
});

module.exports = router;