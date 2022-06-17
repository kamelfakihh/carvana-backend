const {
    signup,
    signin
} = require('../controllers/usersController.js')

const Router = require('express').Router;
 
// initialize express router
const usersRouter = Router();

// POST request to create user
usersRouter.post('/signup', signup);

// POST request to sign in a user
usersRouter.post('/signin', signin);

module.exports = usersRouter;