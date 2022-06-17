const mongoose  = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname : {
        type: String,
        maxLength: 128        
    },
    lastname : {
        type: String,
        maxLength: 128                
    },
    role : {
        type: String,
        required: true,
        default : "CUSTOMER",
        enum: ["CUSTOMER", "ADMIN"]
    }
})

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;