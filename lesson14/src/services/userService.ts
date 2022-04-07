import bcrypt from 'bcrypt';
import { UpdateResult } from 'typeorm';
import { IUser } from '../entity/user';
import { userRepository } from '../reporitories/user/userRepository';

class UserService {
    public async createUser(user: IUser): Promise<IUser> {
        const { password } = user;
        const hashedPassword = await this._hashPassword(password);
        const dataToSave = { ...user, password: hashedPassword };
        const createdUser = await userRepository.createUser(dataToSave);
        return createdUser;
    }

    public async getUserByEmail(email: string): Promise<IUser | undefined> {
        return userRepository.getUserByEmail(email);
    }

    public async getUserPagination(filterObject: any, page: number, perPage: number){
        return userRepository.getUserPagination(filterObject, perPage, page);
    }

    public async getUserById(id: number): Promise<IUser | undefined> {
        return userRepository.getUserById(id);
    }

    public async getUsers(): Promise<IUser[]> {
        return userRepository.getUsers();
    }
    public async updateUserFP(id: number, obj: Partial<IUser>): Promise<object | undefined> {
        if(obj.password){
            obj.password = await this._hashPassword(obj.password);
        }
        return userRepository.updateUserFP(id, obj);
    }

    public async updateUser(id: number,  firstName: string, lastName: string, age: number, phone: string): Promise<UpdateResult> {
        return userRepository.updateUser(id, firstName, lastName, age, phone);
    }

    public async deleteUser(id: number): Promise<UpdateResult> {
        return userRepository.deleteUser(id);
    }

    public async compareUserPasswords(password: string, hash: string): Promise<void | Error> {
        const isPasswordUnique = await bcrypt.compare(password, hash);

        if(!isPasswordUnique){
            throw new Error('User not exists')
        }
    }

    private async _hashPassword(password:string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
}

export const userService = new UserService();
