import {
    EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';
import { IPost, Post } from '../../entity/post';
import { IPostRepository } from './postRepository.interface';

@EntityRepository(Post)
class PostRepository extends Repository<Post> implements IPostRepository {
    public async getPosts(): Promise<IPost[]> {
        return getManager().getRepository(Post).find({ relations: ['comments'] });
    }

    public async getPostByUserId(userId: number): Promise<IPost | undefined> {
        return getManager().getRepository(Post).findOne({ userId });
    }

    public async updatePost(id: number, text: string): Promise<UpdateResult> {
        return getManager().getRepository(Post).update({ id }, { text });
    }
    public async createPost(post: IPost): Promise<IPost> {
        return getManager().getRepository(Post).save(post);
    }
}

export const postRepository = new PostRepository();
