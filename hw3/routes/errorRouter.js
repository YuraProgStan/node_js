const {Router} = require('express');

const errorController = require('../controllers/errorController');

const errorRouter = Router();

errorRouter.get('/', errorController.errorRender);

module.exports = errorRouter;