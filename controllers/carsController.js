const mongoose = require('mongoose');
const carModel = require('../models/carModel.js')

// GET request for a list of all cars
// example call : GET http://locahost:3000/cars?limit=5&orderBy=year&order=asc
const getCars = async (req, res) => {
    
    try {

        // get filter options from query
        let {
            limit,      // number of cars to return
            skip,       // index of first returned car
            sortBy,     // sort by a specified field
            order,      // sort order : desc (default), asc
            maker,      // filter by maker
            model,      // filter by model
            year,       // filter by year
            sale_status // filter by sale status
        } = req.query;

        // set default limit and skip values
        if(!limit) limit = 10;
        else limit = Number(limit);

        if(!skip) skip = 0;
        else skip = Number(skip);

        // define filters by fields
        let filters = {};
        if(maker) filters.maker = maker;
        if(model) filters.model = model;
        if(year) filters.year = year;
        if(sale_status) filters.sale_status = sale_status;

        let options = {
            limit,
            skip,
        }

        // sort by field sortBy
        if(sortBy){
            options.sort = {}
            options.sort[sortBy] = (order === "desc") ? -1 : 1;
        }        

        const cars =  await carModel.find(filters, {}, options);

        res.status(200).json({
            count : cars.length,
            limit,
            skip,
            cars
        })

    }catch(error){
        res.status(500).json({message : "internal error"})
    }
}

// GET request for one car (specified by its ID)
const getCar = async (req, res) => {

    try {

        // get car id from params
        const id = req.params.id;

        const car =  await carModel.findById(id);

        if(car){
            res.status(200).json({
                message: "car found",
                car
            });
        }else{
            res.status(400).json({
                message: "car not found"
            });
        }

    } catch(error){
        res.status(500).json({message : "internal error"})
    }
}

// POST request to add a car
const addCar = async (req, res) => {
    try {

        const car = req.body;

        try {

            const result = await carModel.create(car);

            if(result){
                res.status(201).json({
                    message: "added car to database",
                    car : result
                })
            }else{
                res.status(409).json({message: "failed to add car to database"});
            }

        // this try/catch block handles carModel.create errors
        }catch(error){
            console.log(error);
            res.status(400).json({message: "car validation failed"});
        }

    } catch(error){
        res.status(500).json({message : "internal error"})
    }
}

// PUT request to update a car
const updateCar = async (req, res) => {

    try{
        const id = req.params.id;
        
        const { maker, model, price, year, body_type,
            sale_status, mileage, details, location} = req.body;

        // format update object based on query body
        // full path of a field in a nested object must be provided as a key to provide overriding the whole object
        // example : {"details.doors" : 2}
        let update = {};

        price         && (update.price = price)
        model         && (update.model = model)
        maker         && (update.maker = maker)
        year          && (update.year = year)
        body_type     && (update.body_type = body_type)
        sale_status   && (update.sale_status = sale_status)
        mileage       && (update.mileage = mileage)

        if(details){

            const {doors, exteriorColor, interiorColor, driveTrainDescription, fuelDescription, engineDescription, transmission} = details;

            doors                 && (update["details.doors"] = doors)
            exteriorColor         && (update["details.exteriorColor"] = exteriorColor)
            interiorColor         && (update["details.interiorColor"] = interiorColor)
            driveTrainDescription && (update["details.driveTrainDescription"] = driveTrainDescription)
            fuelDescription       && (update["details.fuelDescription"] = fuelDescription)
            engineDescription     && (update["details.engineDescription"] = engineDescription)
            transmission          && (update["details.transmission"] = transmission)
        }

        if(location){

            const {address, city, zip} = location

            address && (update["location.address"] = address)
            city    && (update["location.city"] = city)
            zip     && (update["location.zip"] = zip)
        }        

        const result = await carModel.updateOne(
            {
                _id: id
            },
            update
        )

        if(result.matchedCount !== 1){
            res.status(400).json({message : "car does not exist"})
        }

        if(result.modifiedCount === 1){
            res.status(200).json({
                message : "car updated"
            })
        }else{
            res.status(200).json({
                message : "car updated"
            })
        }

    } catch(error){
        res.status(500).json({message : "internal error"})
    }
}

// DELETE request to delete a car
const deleteCar = async (req, res) => {

    const id = req.params.id;
    const filters = {
        _id : id
    }

    const results = await carModel.deleteOne(filters)
    if(results.deletedCount === 1){
        return res.status(200).json({message : "car deleted"});
    }else{
        return res.status(200).json({message : "failed to delete car"});
    }

}

module.exports = {
    getCars,
    getCar,
    addCar,
    updateCar,
    deleteCar
}