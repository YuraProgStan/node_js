import {
    EntityRepository, getManager, Repository,
} from 'typeorm';
import {IUserImage, UserImage} from '../../entity/userImage';
import {IuserImageRepository} from './userImageRepository.interface';

@EntityRepository(UserImage)
class UserImageRepository extends Repository<UserImage> implements IuserImageRepository {
    public async getUserImages(): Promise<IUserImage[]> {
        return getManager().getRepository(UserImage).find();
    }
    public async createUserImage(userImage: IUserImage): Promise<IUserImage> {
        return getManager().getRepository(UserImage).save(userImage);
    }

    public async  getUserImageByUserId(userId: number): Promise<IUserImage | undefined>  {
        return getManager().getRepository(UserImage).findOne({ userId });
    }
}

export const userImageRepository = new UserImageRepository();
