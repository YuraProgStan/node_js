import { Request, Response } from 'express';
import { IUser } from '../entity/user';
import { userService } from '../services/userService';

class UserController {
    public async createUser(req: Request, res: Response): Promise<Response<IUser>> {
        const createdUser = await userService.createUser(req.body);
        return res.json(createdUser);
    }

    public async getUserByEmail(req: Request, res: Response): Promise<Response<IUser>> {
        const { email } = req.params;
        const user = await userService.getUserByEmail(email);
        return res.json(user);
    }

    public async getUsers(req: Request, res: Response): Promise<Response<IUser>> {
        const users = await userService.getUsers();
        return res.json(users);
    }

    public async updateUser(req: Request, res: Response): Promise<Response<IUser>> {
        const { password, email } = req.body;
        const userId = Number(req.params.id);
        const updateUser = await userService.updateUser(userId, password, email);
        return res.json(updateUser);
    }

    public async deleteUser(req: Request, res: Response): Promise<void> {
        const userId = Number(req.params.id);
        const deleteUser = await userService.deleteUser(userId);
        res.json(deleteUser);
    }
}

export const userController = new UserController();
