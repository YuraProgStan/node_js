const {Router} = require('express');

const userController = require('../controllers/userController');

const userRouter = Router();

userRouter.get('/', userController.userRender);
userRouter.delete('/:userId', userController.userDelete);

module.exports = userRouter;