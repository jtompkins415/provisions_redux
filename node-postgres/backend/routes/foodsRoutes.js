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

//GET FOOD ITEM BY ID
router.get('/:id', async function(req, res, next){
    try {
        const id = req.params.id;
        const result = await FoodItem.getFoodItemById(id);
        return res.status(200).json(result);
    } catch (err) {
        return next(err);
    }
});

//CREATE FOOD ITEM
router.post('/create', upload.none(), async function(req, res, next){
    try {
        const {name, category, price, description} = req.body;
        const newFoodItem = await FoodItem.createFoodItem(name, category, price, description);
        return res.status(201).json(newFoodItem);
    } catch (err) {
        return next(err);
    }
});

//UPDATE FOOD ITEM
router.patch('/update/:id/:field', upload.none(), async function(req, res, next){
    try {
        const id = req.params.id;
        const field = req.params.field;
        const {[field]: newValue} = req.body;

        const foodItemToUpdate = await FoodItem.getFoodItemById(id);
        await foodItemToUpdate.updateFoodItem(field, newValue);

        return res.status(200).json({
            message: `${field} updated successfully`, foodItemToUpdate
        });
    } catch (err) {
        return next(err);
    }
});

//DELETE FOOD ITEM
router.delete('/remove/:id', async function(req, res, next){
    try {
        const id = req.params.id;
        const foodItemToDelete = await FoodItem.getFoodItemById(id);

        await foodItemToDelete.deleteFoodItem();
        return res.status(200).json({message: `${foodItemToDelete.name} removed successfully`, foodItemToDelete});
    } catch (err) {
        return next(err);
    }
})

module.exports = router;