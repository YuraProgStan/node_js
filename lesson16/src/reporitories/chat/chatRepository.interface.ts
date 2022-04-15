import {IChat} from "../../entity/chat";

export interface IChatRepository{
    getMessages(): Promise<IChat[]>;
    createMessage(message: IChat): Promise<IChat>
}
