const {users, signUser} = require('../db/state');

class signInController {
    signInRender(req, res) {
        res.render('signIn');
    };

    signInPost(req, res) {
        if (users.find(value => value.email === req.body.email && value.password === req.body.password)) {
            const find = users.find(value => value.email === req.body.email);
            signUser.push(find);

            res.redirect('/user');
            return;
        }
        res.redirect('/wrongSignIn');
    }
}

module.exports = new signInController();