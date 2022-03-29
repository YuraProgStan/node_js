"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const router = (0, express_1.Router)();
router.get('/:email', userController_1.userController.getUserByEmail);
router.get('/', userController_1.userController.getUsers);
router.patch('/:id', userController_1.userController.updateUser);
router.delete('/:id', userController_1.userController.deleteUser);
router.post('/', userController_1.userController.createUser);
exports.userRouter = router;
//# sourceMappingURL=userRouter.js.map