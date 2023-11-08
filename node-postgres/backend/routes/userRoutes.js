//USER ROUTING

const express = require('express');
const User = require('../models/userModel');
const router = new express.Router();


//GET ALL USERS
router.get('/', async function(req, res){
    let users = await User.getAllUsers();
    return res.json(users);
});

module.exports = router;