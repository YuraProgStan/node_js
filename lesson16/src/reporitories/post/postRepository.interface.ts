import { UpdateResult } from 'typeorm';
import { IPost } from '../../entity/post';

export interface IPostRepository{
    getPosts(): Promise<IPost[]>;
    getPostByUserId(userId: number): Promise<IPost | undefined>;
    updatePost(id: number, text: string): Promise<UpdateResult>
}
