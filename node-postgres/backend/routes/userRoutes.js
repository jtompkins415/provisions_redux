//USER ROUTING

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/userModel');

//Import multer to parse form data directly from request body
const multer = require('multer');
const upload = multer();

dotenv.config();

const router = new express.Router();
const BCRYPT_WORK_FACTOR = 12;
const SECRET_KEY = process.env.SECRET_KEY;
const JWT_OPTIONS = JSON.parse(process.env.JWT_OPTIONS);

//GET ALL USERS
router.get('/', async function(req, res, next){
    console.log('Request of users heard')
    try {
        let users = await User.getAllUsers();
        return res.status(200).json(users);
    }catch(err){
        return next(err);
    }
    
});

//GET USER BY ID
router.get('/:username', async function(req, res, next){
    try {
        let username = req.params.username;
        let user = await User.getUserByUsername(username);
        return res.status(200).json(user);
    } catch (err) {
        return next(err);
    }
})

//CREATE USER
router.post('/create', upload.none(), async function(req, res, next){
    try {
        const {username, email, password, first_name, last_name, city, state } = req.body;
        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
        let newUser = await User.createUser(username, email, first_name, last_name, hashedPassword, city, state);

        if(newUser){
            let token = jwt.sign({username}, SECRET_KEY, JWT_OPTIONS);
            return res.status(201).json({token})
        } else {
            return res.status(409).json({error: 'User Signup Unsuccessful'});
        }

        
    } catch (err) {
        console.log('Sign Up Error:', err);
        return res.status(500).json({error: 'Internal Server Error'});
    }
})

//LOGIN USER
router.post('/login', upload.none(), async function(req, res, next){
    try {
        const {username, password} = req.body;
        const result = await User.getUserByUsername(username);

        if(!result){
            return res.status(401).json({error: 'Invalid username or password'});
        }

        const user = result;
        
        if(user){
            // Compare user input w/ hashed password; if passwords match assign create & return token
            const passwordMatch = await bcrypt.compare(password, user.password)
            if(passwordMatch){
                let token = jwt.sign({username}, SECRET_KEY, JWT_OPTIONS);
                return res.json({token});
            } else {
                return res.status(401).json({error: 'Invalid username or password'});
            }  
        }
        
    } catch (err) {
        console.log('Login Error:', err);
        return res.status(500).json({err: 'Internal Server Error'});
    }
})

//UPDATE USER
router.patch('/update/:username/:field', upload.none(), async function(req, res, next){
    try {
        const username = req.params.username;
        const field = req.params.field;
        //Dynamically  use the field parameter as the key to destructure from `req.body`
        const {[field]: newValue} = req.body;

        const userToUpdate = await User.getUserByUsername(username)
        await userToUpdate.updateUserField(field, newValue);
        return res.status(200).json({
            message: `${field} updated successfully`});
    } catch (err) {
        return next(err);
    }
})

//DELETE USER
router.delete('/remove/:username', async function(req, res, next){
    try {
        const {username} = req.params;
        const userToDelete = await User.getUserByUsername(username);
        await userToDelete.deleteUser();
        return res.json({message: `${userToDelete.username} deleted`})
    } catch (err) {
        return next(err);
    }
})



module.exports = router;