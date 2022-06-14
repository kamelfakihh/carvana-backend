const express = require('express');
const carsRouter = require('./routes/carsRoute.js');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const { 
    PORT, 
    DB_NAME, 
    DB_PORT, 
    DB_HOST
} = process.env;

async function startServer(){

    try {

        // intialize express app
        const app = express();
        
        app.use(express.json());                

        // initialize routes
        app.use('/cars', carsRouter);      

        // start listening for requests
        app.listen(PORT, () => console.log(`listening on port ${PORT}`));
        
    }catch(error){
        console.log(error)
    }
}

startServer();