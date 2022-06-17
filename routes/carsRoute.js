const {
    getCars,
    getCar,
    addCar,
    updateCar,
    deleteCar
} = require('../controllers/carsController.js')

const {authenticateToken} = require('../auth/auth.js');

const Router = require('express').Router;
 
// initialize express router
const carsRouter = Router();

// GET request for one car (specified by its ID)
carsRouter.get('/:id', getCar);

// GET request for a list of all cars 
carsRouter.get('/', getCars);

// POST request to add a car
carsRouter.post('/add', authenticateToken, addCar);

// PUT request to update a car 
carsRouter.put('/:id/update', authenticateToken, updateCar);

// DELETE request to delete a car
carsRouter.delete('/:id/delete', authenticateToken, deleteCar);

module.exports = carsRouter;