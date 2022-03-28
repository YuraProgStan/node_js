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

    public async getUsers(): Promise<IUser[]> {
        return userRepository.getUsers();
    }

    public async updateUser(id: number, password: string, email: string): Promise<UpdateResult> {
        const hashedPassword = await this._hashPassword(password);
        return userRepository.updateUser(id, hashedPassword, email);
    }

    public async deleteUser(id: number): Promise<UpdateResult> {
        return userRepository.deleteUser(id);
    }

    private async _hashPassword(password:string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
}

export const userService = new UserService();
