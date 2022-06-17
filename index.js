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

async function connectDB(){

    try {
        
        //  example uri : "mongodb://localhost:21017/carvana"
        const CONNECTION_URI = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
        await mongoose.connect(CONNECTION_URI);

        const db = mongoose.connection;
        db.on('error', error => {
            console.log("database connection error: " + error);
        })

        console.log("connected to database");

    } catch(error){
        console.log("failed to connect to database", error);
    }
}

async function startServer(){

    try {   
        
        await connectDB();       

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