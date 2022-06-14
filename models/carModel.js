const mongoose  = require('mongoose');

const tagSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    description : String
});

const carSchema = new mongoose.Schema({
    maker : {
        type: String,
        maxLength: 128,        
        required: true
    },
    model : {
        type: String,
        maxLength: 128,        
        required: true
    },
    price : {
        type : Number,
        required: true,
        min: 0
    },
    year : {
        type: Number,
        required: true,
        min: 0        
    },
    body_type : {
        type: String,
        maxLength: 128,        
    },
    sale_status : {
        type: String,        
        enum: ["Available", "Sold", "Rented"]
    },
    mileage : {
        type: Number,
        min: 0
    }, 
    details : {
        doors : {
            type: Number,
            min: 1,
            max: 10
        },
        exteriorColor : String,
        interiorColor : String,
        driveTrainDescription : {
            type: String,
            required: true,
            enum: ["AWD", "RWD", "FWD"]
        },
        fuelDescription : String,
        engineDescription : String,        
        transmission : String
    },
    location : {
        address: {
            type: String,
            required: true
        },
        city : {
            type: String,
            required: true
        },
        zip : String
    },
    tags : [tagSchema]
})

const carModel = mongoose.model('car', carSchema);
module.exports = carModel;