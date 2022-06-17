const {
    signup
} = require('../controllers/usersController.js')

const Router = require('express').Router;
 
// initialize express router
const usersRouter = Router();

// POST request to create user
usersRouter.post('/signup', signup);

module.exports = usersRouter;