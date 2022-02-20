const {signUser} = require('../db/state');

class UserController {
    userRender(req, res) {
        res.render('user', {user: signUser});
    }
}

module.exports = new UserController();