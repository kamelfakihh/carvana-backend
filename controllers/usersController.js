const mongoose = require('mongoose');
const userModel = require('../models/userModel.js')
const {generateAccessToken} = require('../auth/auth.js')

// POST signup a new user
const signup = async (req, res) => {
    
    try {

        const {firstname, lastname, email, password} = req.body;

        const user = await userModel.create({
            firstname, lastname, email, password
        })

        if(user){
            res.status(200).json({
                message : "created user"                
            })
        }else{
            res.status(400).json({
                message : "failed to create user"
            })
        }

    }catch(error){
        console.log(error)
        res.status(500).json({message : "internal error"})
    }
}

// POST signin user
const signin = async (req, res) => {
    try {

        const {email, password} = req.body;        

        // get user info from database
        const user = await userModel.findOne({ email });        
        if (!user) {
            return res.status(400).json({message : "user does not exist"});
        }

        // check if the provided password is valid
        const validate = await user.isValidPassword(password);

        if (!validate) {
            return res.status(403).json({message : "incorrect password"});
        }

        // sign and send access token
        const payload = { _id: user._id, email: user.email, role : user.role};
        const token = generateAccessToken(payload);

        return res.status(200).json({ 
            message: 'logged in successfully',
            token
        })

    }catch(error){        
        res.status(500).json({message : "internal error"})
    }
}

module.exports = {
    signup,
    signin
}