import {
    EntityRepository, getManager, LessThan, Repository, UpdateResult,
} from 'typeorm';
import { IUser, User } from '../../entity/user';
import { IUserRepository } from './userRepository.interface';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import {IPaginationResponseInterface} from "../../interfaces";

dayjs.extend(utc);

@EntityRepository(User)
class UserRepository extends Repository<User> implements IUserRepository {
    public async createUser(user: IUser): Promise<IUser> {
        return getManager().getRepository(User).save(user);
    }

    public async updateUserFP(id: number, user: Partial<IUser>): Promise<object | undefined> {
        return getManager().getRepository(User).update({id}, user);
    }

    public async getUserByEmail(email: string): Promise<IUser | undefined> {
        return getManager().getRepository(User)
            .createQueryBuilder('user')
            .where('user.email = :email', { email })
            .andWhere('user.deletedAt IS NULL')
            .getOne();
    }
    public async getUserById(id: number): Promise<IUser | undefined> {
        console.log(id);
        return getManager().getRepository(User)
            .createQueryBuilder('user')
            .where('user.id = :id', { id })
            .andWhere('user.deletedAt IS NULL')
            .getOne();
    }

    public async getUsers(): Promise<IUser[]> {
        return getManager().getRepository(User).find({ relations: ['posts'] });
    }

    public async updateUser(id: number, firstName: string, lastName: string, age: number, phone: string): Promise<UpdateResult> {
        return getManager().getRepository(User).update(
            id,
            { firstName, lastName, age, phone },
        );
    }

    public async deleteUser(id: number): Promise<UpdateResult> {
        return getManager().getRepository(User).softDelete({ id });
    }

    public async getNewUsers() {
        return getManager().getRepository(User).find({
            where: {
                createdAt: LessThan(dayjs().utc().startOf('day').format())
            }
            })
    }
    // public async getNewUsers() {
    //     return getManager().getRepository(User)
    //         .createQueryBuilder('user')
    //        .where('user.createdAt <= :date', {date: dayjs().utc().startOf('day').format()})
    //         .getMany()
    // }
    public async getUserPagination(
        searchObject: Partial<IUser> = {},
        limit: number,
        page: number = 1
    )
        : Promise<IPaginationResponseInterface<IUser>>{
        const skip = limit * (page - 1)
        const [users, itemCount] = await getManager().getRepository(User)
            .findAndCount({where: searchObject, skip, take: limit});
        return{
            page,
            perPage: limit,
            itemCount,
            data: users
        };
    }
}

export const userRepository = new UserRepository();
