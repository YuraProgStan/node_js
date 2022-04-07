import { UpdateResult } from 'typeorm';
import { IUser } from '../../entity/user';
import {IPaginationResponseInterface} from "../../interfaces";
export interface IUserRepository{
    createUser(user: IUser): Promise<IUser>;
    getUserByEmail(email: string): Promise<IUser | undefined>;
    getUsers(): Promise<IUser[]>;
    updateUser(id: number, firstName: string, lastName: string, age: number, phone: string): Promise<UpdateResult>;
    deleteUser(id: number): Promise<UpdateResult>;
    getUserById(id: number): Promise<IUser | undefined>;
    getUserPagination(searchObject: Partial<IUser>, limit: number, page: number): Promise<IPaginationResponseInterface<IUser>>
}
