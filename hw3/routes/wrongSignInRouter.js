const {Router} = require('express');
const wrongSignInController = require('../controllers/wrongSignInController');

const wrongSignInRouter = Router();

wrongSignInRouter.get('/', wrongSignInController.WrongSignInRender);

module.exports = wrongSignInRouter;