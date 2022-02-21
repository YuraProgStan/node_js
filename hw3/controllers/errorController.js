const {wrongEmail} = require('../db/state');

class errorController {
    errorRender(req, res)  {
    res.render('error', {email: wrongEmail});
};

}

module.exports = new errorController();