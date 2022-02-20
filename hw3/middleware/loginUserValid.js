function loginUserValid(req, res, next) {
    try {
        const {firstName, lastName , email, password, age, city} = req.body;

        if (!firstName || !lastName || !email || !password || !age || !city) {
            throw new Error('firstName or lastName or email or password or age or city is not provided');
        }
        // if (password.length < 6) {
        //     throw new Error(('Not valid password'))
        // }
        next();
    } catch (err) {
        console.log(err.message);
        res.status(400).send(err.message);
    }
}
module.exports = loginUserValid;