import { UpdateResult } from 'typeorm';
import { IPost } from '../entity/post';
import { postRepository } from '../reporitories/post/postRepository';

class PostService {
    public async getPosts(): Promise<IPost[]> {
        return postRepository.getPosts();
    }

    public async getPostByUserId(userId:number): Promise<IPost | undefined> {
        return postRepository.getPostByUserId(userId);
    }

    public async updatePost(id:number, text: string): Promise<UpdateResult> {
        return postRepository.updatePost(id, text);
    }
}

export const postService = new PostService();
