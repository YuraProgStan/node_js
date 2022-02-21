class WrongSignInController {
    WrongSignInRender(req, res) {
        res.render('wrongSignIn');
    };
}

module.exports = new WrongSignInController();