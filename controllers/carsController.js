const mongoose = require('mongoose');
const carModel = require('../models/carModel.js')

// GET request for a list of all cars
const getCars = async (req, res) => {}

// GET request for one car (specified by its ID)
const getCar = async (req, res) => {}

// POST request to add a car
const addCar = async (req, res) => {}

// PUT request to update a car
const updateCar = async (req, res) => {}

// DELETE request to delete a car
const deleteCar = async (req, res) => {}

module.exports = {
    getCars,
    getCar,
    addCar,
    updateCar,
    deleteCar
}