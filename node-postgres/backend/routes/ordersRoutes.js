const express = require('express');
const Order = require('../models/orderModel');
const OrderItem = require('../models/orderItemModel');

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

//GET ORDER BY ORDER ID
router.get('/:order_id', async function(req, res, next){
    try {
        const {order_id} = req.params;
        const result = await Order.getOrderById(order_id);
        return res.status(200).json(result);
    } catch (err) {
        return next(err);
    };
});

//GET ORDER BY USER ID
router.get('/:user_id', async function(req, res, next){
    try {
        const {user_id} = req.params;
        const result = await Order.getOrdersByUser(user_id);
        return res.status(200).json(result);
    } catch (err) {
        return next(err);
    }
});

//GET ITEMS FROM ORDER BY ORDER ID
router.get('/items/:order_id', async function(req, res, next){
    try {
        const {order_id} = req.params;
        const results = await OrderItem.getItemsByOrderId(order_id);
        return res.status(200).json(results);
    } catch (err) {
        return next(err);
    }
});

//CREATE NEW ORDER
router.post('/create', upload.none(), async function(req, res, next){
    try{
        const {user_id, total_price, order_date} = req.body;
        const newOrder = await Order.createOrder(user_id, total_price, order_date);

        if(!newOrder){
            return res.status(409).json({error: 'Error in Order Creation'})
        } else {
            return res.status(201).json(newOrder);
        }   
    } catch (err) {
        console.log('Order Creation Error', err);
        return res.status(500).json({error: 'Internal Server Error'});
    }
});

//DELETE ORDER
router.delete('/remove/:order_id', async function(req, res, next){
    try {
        const {order_id} = req.params;
        const orderToDelete = await Order.getOrderById(order_id);
        await orderToDelete.deleteOrder();
        return res.status(200).json({message: `Order ${order_id} deleted successfully`});
    } catch (err) {
        return next(err);
    }
})

module.exports = router;