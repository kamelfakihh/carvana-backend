const {
    getCars,
    getCar,
    addCar,
    updateCar,
    deleteCar
} = require('../controllers/carsController.js')
const Router = require('express').Router;
 
// initialize express router
const carsRouter = Router();

// GET request for a list of all cars 
carsRouter.get('/', getCars);

// GET request for one car (specified by its ID)
carsRouter.get('/:id', getCar);

// POST request to add a car
carsRouter.post('/add', addCar);

// PUT request to update a car 
carsRouter.put('/:id/update', updateCar);

// DELETE request to delete a car
carsRouter.delete('/:id/delete', deleteCar);

module.exports = carsRouter;