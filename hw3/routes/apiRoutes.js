const {Router} = require('express');
const usersRouter = require('./usersRouter');
const loginRouter = require('./loginRouter');
const errorRouter = require('./errorRouter');
const signInRouter = require('./signInRouter');
const userRouter = require('./userRouter');
const wrongSignInRouter = require('./wrongSignInRouter');
const methodOverride = require("method-override");
const {users,signUser} = require('../db/state');

const routes = Router();
routes.use(methodOverride('_method'));
routes.use('/users', usersRouter);
routes.use('/login', loginRouter);
routes.use('/error', errorRouter);
routes.use('/signIn',  signInRouter);
routes.use('/wrongSignIn',  wrongSignInRouter);
routes.use('/user',  userRouter);

routes.use(methodOverride((req, res) => {
    const indexUsers = users.findIndex(value => value.id === req.body.id);
    users.splice(indexUsers, 1);
    const indexSignUser = signUser.findIndex(value => value.id === req.body.id);
    signUser.splice(indexSignUser, 1);
    res.redirect('/users');
}));
routes.use((req, res) => {
    res.render('notFound');
});
module.exports = routes;