
import {IUserImage} from "../entity/userImage";
import {userImageRepository} from '../reporitories/userImage/userImageRepository';


class UserImageService {
    public async getUserImages(): Promise<IUserImage[]> {
        return userImageRepository.getUserImages();
    }

    public async createUserImage(userImage: IUserImage):Promise<IUserImage>{
        return userImageRepository.createUserImage(userImage);
    }
    public async getUserImageByUserId(userId:number): Promise<IUserImage | undefined> {

        return userImageRepository.getUserImageByUserId(userId);
    }

}

export const userImageService = new UserImageService();
