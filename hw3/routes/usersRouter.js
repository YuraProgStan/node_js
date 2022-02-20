const {Router} = require('express');
const {users, signUser, wrongEmail} = require('../db/state');

const usersController = require('../controllers/usersController');

const usersRouter = Router();

usersRouter.get('/', usersController.getAllUsers);
usersRouter.get('/:userId', usersController.getUsersById);

module.exports = usersRouter;