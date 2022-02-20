const {Router} = require('express');
const loginMiddleware = require('../middleware/loginUserValid');
const loginController = require('../controllers/loginController');

const loginRouter = Router();

loginRouter.get('/', loginController.loginRender);
loginRouter.post('/', loginMiddleware, loginController.loginPost);

module.exports = loginRouter;