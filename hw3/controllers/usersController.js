const {users, wrongEmail} = require('../db/state');

class UsersController {
    getAllUsers(req, res) {
        if (!Object.keys(req.query).length) {
            res.render('users', {users});
            return;
        }
        let newUsers = [...users];
        if (req.query.age && req.query.city) {
            newUsers = newUsers.filter(value => value.age === req.query.age && value.city === req.query.city);
        } else if (req.query.age) {
            newUsers = newUsers.filter(value => value.age === req.query.age)
        } else if (req.query.city) {
            newUsers = newUsers.filter(value => value.city === req.query.city)
        } else {
            res.render('users', {users});
            return;
        }
        res.render('users', {users: newUsers});
    }
    getUsersById({params}, res) {
    const user = users.find(value => value.id === +params.userId);

    if (!user) {
    wrongEmail = `User with id: ${params.userId} does not exist`;
    res.redirect('/error');
    return;
}

res.render('user', {user: [user]});
}

}
module.exports = new UsersController();