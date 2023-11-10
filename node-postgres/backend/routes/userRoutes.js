//USER ROUTING

const express = require('express');
const User = require('../models/userModel');

//Import multer to parse form data directly from request body
const multer = require('multer');
const upload = multer();

const router = new express.Router();


//GET ALL USERS
router.get('/', async function(req, res, next){
    try {
        let users = await User.getAllUsers();
        return res.status(200).json(users);
    }catch(err){
        return next(err);
    }
    
});

//GET USER BY ID
router.get('/:id', async function(req, res, next){
    try {
        let id = req.params.id;
        let user = await User.getUserById(id);
        return res.status(200).json(user);
    } catch (err) {
        return next(err);
    }
})

//CREATE USER
router.post('/create', upload.none(), async function(req, res, next){
    try {
        const {username, email, password, first_name, last_name, city, state } = req.body;
        let newUser = await User.createUser(username, email, first_name, last_name, password, city, state);
        console.log(newUser);
        return res.status(201).json(newUser);
    } catch (err) {
        return next(err)
    }
})

//UPDATE USER
router.patch('/update/:id/:field', upload.none(), async function(req, res, next){
    try {
        const id = req.params.id;
        const field = req.params.field;
        //Dynamically  use the field parameter as the key to destructure from `req.body`
        const {[field]: newValue} = req.body;

        const userToUpdate = await User.getUserById(id)
        userToUpdate.updateUserField(field, newValue);

        return res.status(200).json({message: `${field} updated successfully `});
    } catch (err) {
        return next(err);
    }
})

//DELETE USER
router.delete('/remove/:id', async function(req, res, next){
    try {
        const {id} = req.params;
        const userToDelete = await User.getUserById(id);
        await userToDelete.deleteUser();
        return res.json({message: `${userToDelete.username} deleted`})
    } catch (err) {
        return next(err);
    }
})

module.exports = router;