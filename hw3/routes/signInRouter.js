const {Router} = require('express');
const signInMiddleware = require('../middleware/signInUserValid');
const signInController = require('../controllers/signInController');

const signInRouter = Router();

signInRouter.get('/', signInController.signInRender);
signInRouter.post('/', signInMiddleware, signInController.signInPost);

module.exports = signInRouter;