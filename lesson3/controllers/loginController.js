const users = require('../db/users');

class LoginController {
    getLoginUser(req, res) {
        res.render('login');
    }
    loginUser(req, res) {
        users.push(req.body);
        res.redirect('/users');
    }


}

module.exports = new LoginController();