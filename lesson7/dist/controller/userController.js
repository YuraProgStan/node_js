"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const userService_1 = require("../services/userService");
class UserController {
    async createUser(req, res) {
        const createdUser = await userService_1.userService.createUser(req.body);
        return res.json(createdUser);
    }
    async getUserByEmail(req, res) {
        const { email } = req.params;
        const user = await userService_1.userService.getUserByEmail(email);
        return res.json(user);
    }
    async getUsers(req, res) {
        const users = await userService_1.userService.getUsers();
        return res.json(users);
    }
    async updateUser(req, res) {
        const { password, email } = req.body;
        const userId = Number(req.params.id);
        const updateUser = await userService_1.userService.updateUser(userId, password, email);
        return res.json(updateUser);
    }
    async deleteUser(req, res) {
        const userId = Number(req.params.id);
        const deleteUser = await userService_1.userService.deleteUser(userId);
        res.json(deleteUser);
    }
}
exports.userController = new UserController();
//# sourceMappingURL=userController.js.map