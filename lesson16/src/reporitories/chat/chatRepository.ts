import {
    EntityRepository, getManager, Repository,
} from 'typeorm';
import { IChat, Chat } from '../../entity/chat';
import { IChatRepository } from './chatRepository.interface';

@EntityRepository(Chat)
class PostRepository extends Repository<Chat> implements IChatRepository {
    public async getMessages(): Promise<IChat[]> {
        return getManager().getRepository(Chat).find();
    }

    public async createMessage(message: IChat): Promise<IChat> {
        return getManager().getRepository(Chat).save(message);
    }
}

export const chatRepository = new PostRepository();
