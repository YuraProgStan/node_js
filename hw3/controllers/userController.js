const {users, signUser} = require('../db/state');

class UserController {
    userRender(req, res) {
        res.render('user', {user: signUser});
    };

    userDelete({params}, res) {
        const indexUsers = users.findIndex(value => value.id === +params.userId);
        users.splice(indexUsers, 1);
        const indexSignUser = signUser.findIndex(value => value.id === +params.userId);
        signUser.splice(indexSignUser, 1);
        res.redirect('/users');
    }
}

module.exports = new UserController();