const {users} = require("../db/state");

function signInUserValid(req, res, next) {
    try {
        const {email} = req.body;

        if (!users.find(value => value.email === email)) {
            throw new Error('email or password is not valid');
        }
        next();
    } catch (err) {
        console.log(err.message);
        res.status(400).send(err.message);
    }
}
module.exports = signInUserValid;