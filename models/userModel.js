const bcrypt = require('bcryptjs');
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
    email : {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role : {
        type: String,
        required: true,
        default : "CUSTOMER",
        enum: ["CUSTOMER", "ADMIN"]
    }
})

userSchema.pre(
    'save',
    async function (next) {
        const user = this;                
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        next();
    }
);

userSchema.methods.isValidPassword = async function(password) {
    
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;