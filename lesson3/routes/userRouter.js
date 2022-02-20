const  {Router} = require('express');
const users = require('../db/users');
const userController = require('../controllers/userController');

const userRouter = Router();
/*userRouter.get('/',(req, res)=>{
    res.render('users',{users});
});*/
userRouter.get('/', userController.renderUsers);
// userRouter.get('/:userId',(req, res)=>{
//     const {userId} = (req.params);
//     console.log(req.query);
//     res.json(users[userId]);
// });
userRouter.get('/:userId', userController.getUserById);

module.exports = userRouter;
