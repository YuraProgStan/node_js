const {users, wrongEmail} = require('../db/state');

class LoginController {
    loginRender(req, res) {
        res.render('login');
    }

    loginPost(req, res) {
        const {body} = req;

        if (users.find(value => value.email === body.email)) {
            wrongEmail = `Write another email. This ${body.email} address is already in use`;
            res.redirect('/error');
        } else {
            users.push({...body, id: users.length ? users[users.length - 1].id + 1 : 1});
            res.redirect('/users');
        }

    }

}

module.exports = new LoginController()