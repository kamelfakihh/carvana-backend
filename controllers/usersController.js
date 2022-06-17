const mongoose = require('mongoose');
const userModel = require('../models/userModel.js')

// POST signup a new user
const signup = async (req, res) => {
    
    try {

    }catch(error){
        res.status(500).json({message : "internal error"})
    }
}

module.exports = {
    signup
}