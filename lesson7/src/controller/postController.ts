import { Request, Response } from 'express';
import { postService } from '../services/postService';
import { IPost } from '../entity/post';

class PostController {
    public async getPosts(req: Request, res: Response): Promise<Response<IPost>> {
        const posts = await postService.getPosts();
        return res.json(posts);
    }

    public async getPostByUserId(req: Request, res: Response): Promise<Response<IPost>> {
        const { userId } = req.params;
        const post = await postService.getPostByUserId(Number(userId));
        return res.json(post);
    }

    public async updatePost(req: Request, res: Response): Promise<Response<IPost>> {
        const { text } = req.body;
        const { id } = req.params;
        const update = await postService.updatePost(+id, text);
        return res.json(update);
    }
}

export const postController = new PostController();
