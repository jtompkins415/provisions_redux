//WINE ROUTES

const express = require('express');
const Wine = require('../models/wineModel');
const multer = require('multer');

const router = express.Router();
const upload = multer();

//GET ALL WINES
router.get('/', async function(req, res, next){
   try {
        const results= await Wine.getAllWines();
        return res.status(200).json(results);
   } catch (err) {
        return next(err);
   }
});

//GET WINES BY ID
router.get('/:id', async function(req, res, next){
    try {
        const id = req.params.id;
        const result = await Wine.getWineById(id);
        return res.status(200).json(result);
    } catch (err) {
        return next(err);
    }
});

//CREATE WINE
router.post('/create', upload.none(), async function(req, res, next){
    try {
        const {wine_name, winery, wine_style, vintage, price, abv, description} = req.body;
        const newWine = await Wine.createWine(wine_name, winery, wine_style, vintage, price, abv, description);
        return res.status(201).json(newWine);
    } catch (err) {
        return next(err);
    }
});

//UPDATE WINE
router.patch('/update/:id/:field', upload.none(), async function(req, res, next){
    try {
        const id = req.params.id;
        const field = req.params.field;
        const {[field]: newValue} = req.body;

        const wineToUpdate = await Wine.getWineById(id);
        await wineToUpdate.updateWine(field, newValue);
        
        return res.status(200).json({message: `${field} updated successfully`});
    } catch (err) {
        return next(err);
    }
});

//DELETE WINE
router.delete('/remove/:id', async function(req, res, next){
    try {
        const id = req.params.id;
        const wineToRemove = await Wine.getWineById(id);
        await wineToRemove.deleteWine();

        return res.status(200).json({message: `${wineToRemove.wine_name} removed successfully`});
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
