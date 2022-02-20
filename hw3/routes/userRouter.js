const {Router} = require('express');

const userController = require('../controllers/userController');

const userRouter = Router();

userRouter.get('/', userController.userRender);

module.exports = userRouter;