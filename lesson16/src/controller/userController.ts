import {NextFunction, Request, Response} from 'express';
import { IUser } from '../entity/user';
import { userService } from '../services/';
import {emailService} from '../services';
import {EmailActionEnum} from '../constants';

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
    public  async  getUserPagination(req: Request, res: Response, next: NextFunction){
        try{
            // https://auto.ria.com/uk/search/?categories.main.id=1&price.currency=1&price.USD.gte=10000&price.USD.lte=30000&indexName=auto,order_auto,newauto_search&region.id[0]=10&brand.id[0]=55&model.id[0]=36565&year[0].gte=2015&year[0].lte=2022&size=20
            // https://auto.ria.com/uk/search/?
                // categories.main.id=1&
                // price.currency=1&
                // price.USD.gte=10000&
                // price.USD.lte=30000&
                // indexName=auto,order_auto,newauto_search&region.id[0]=10&
                // brand.id[0]=55&model.id[0]=36565&
                // year[0].gte=2015&
                // year[0].lte=2022&
                // size=20
            const { page = 1, perPage = 25, ...other} = req.query;
            const userPagination = await userService.getUserPagination(other, +page, +perPage);
            res.json(userPagination);
        }catch (e){
            next(e);
        }
    }

    public async updateUser(req: Request, res: Response, next: NextFunction){
        try{
        const { firstName, lastName, age, phone, email } = req.body;
        const userId = Number(req.params.id);
        await userService.updateUser(userId, firstName, lastName, age, phone);
        await emailService.sendMail(email, EmailActionEnum.UPDATE_DATA,{userName: firstName});
            res.sendStatus(201);
        }
        catch (e){
            next(e);
        }
    }

    public async deleteUser(req: Request, res: Response): Promise<void> {
        const userId = Number(req.params.id);
        const deleteUser = await userService.deleteUser(userId);
        res.json(deleteUser);
    }


}

export const userController = new UserController();
