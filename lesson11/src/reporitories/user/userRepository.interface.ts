import { UpdateResult } from 'typeorm';
import { IUser } from '../../entity/user';

export interface IUserRepository{
    createUser(user: IUser): Promise<IUser>;
    getUserByEmail(email: string): Promise<IUser | undefined>;
    getUsers(): Promise<IUser[]>;
    updateUser(id: number, password: string, email: string): Promise<UpdateResult>;
    deleteUser(id: number): Promise<UpdateResult>;
    getUserById(id: number): Promise<IUser | undefined>
}
