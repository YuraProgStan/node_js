import {IUserImage} from "../../entity/userImage";

export interface IuserImageRepository{
    getUserImages(): Promise<IUserImage[]>;
    createUserImage(userImage: IUserImage): Promise<IUserImage>;
    getUserImageByUserId(userId: number): Promise<IUserImage | undefined>

}
