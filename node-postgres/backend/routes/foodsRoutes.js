const express = require('express');
const FoodItem = require('../models/foodModel');

const multer = require('multer');
const upload = multer();

const router = express.Router();

//GET ALL FOODS
router.get('/', async function(req, res, next){
    try {
        const results = await FoodItem.getAllFoods();
        return res.status(200).json(results);
    } catch (err) {
        return next(err);
    }
});

module.exports = router;