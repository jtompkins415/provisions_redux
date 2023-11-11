//BEER ROUTING

const express = require('express');
const Beer = require('../models/beerModel');
const multer = require('multer');

const router = express.Router();
const upload = multer();

//GET ALL BEER
router.get('/', async function(req, res, next){
    try {
        const results = await Beer.getAllBeers();
        return res.status(200).json(results);
    } catch (err) {
        return next(err);
    }
});

//GET BEER BY ID
router.get('/:id', async function(req, res, next){
    try {
       const id = req.params.id;
        const result = await Beer.getBeerById(id);
        return res.status(200).json(result);
    } catch (err) {
        return next(err);
    };
});

//CREATE BEER
router.post('/create', upload.none(), async function(req, res, next){
    try {
        const {beer_name, beer_label, brewery, beer_style, price, beer_abv, description} = req.body;
        const newBeer = await Beer.createBeer(beer_name, beer_label, brewery, beer_style, price, beer_abv, description);
        return res.status(201).json(newBeer);
    } catch (err) {
        return next(err);
    }
});

//UPDATE BEER
router.patch('/update/:id/:field', upload.none(), async function(req, res, next){
    try {
        const id = req.params.id;
        const field = req.params.field;
        const {[field]: newValue} = req.body;

        const beerToUpdate = await Beer.getBeerById(id);
        await beerToUpdate.updateBeer(field, newValue);

        return res.status(200).json({message: `${field} updated successfully`});
    } catch (err) {
        return next(err);
    }
    
});

//DELETE BEER
router.delete('/remove/:id', async function (req, res, next){
    try {
        const id = req.params.id;
        const beerToDelete = await Beer.getBeerById(id);
        await beerToDelete.deleteBeer();

        return res.status(200).json({message: `${beerToDelete.beer_name} has been removed succesfully`});

    } catch ({err}) {
        return next(err);
    }
});

module.exports = router;