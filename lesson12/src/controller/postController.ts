import {NextFunction, Request, Response} from 'express';
import { postService } from '../services';
import { IPost } from '../entity/post';
import {userService} from '../services';

class PostController {
    public async getPosts(req: Request, res: Response): Promise<Response<IPost>> {
        const posts = await postService.getPosts();
        return res.json(posts);
    }
    public async createPost(req: Request, res: Response, next: NextFunction): Promise<Response<IPost>|undefined> {
        try{
            const { userId } = req.body;
            console.log(userId);
       if(!await userService.getUserById(userId)){
            next(new Error('Not find this userId in users'));
            return;
        }
        const post = await postService.createPost(req.body);
        return res.json(post);
        }
        catch (e){
            next(e)
        }
    }

    public async getPostByUserId(req: Request, res: Response): Promise<Response<IPost>> {
        const { userId } = req.params;
        const post = await postService.getPostByUserId(Number(userId));
        return res.json(post);
    }

    public async updatePost(req: Request, res: Response, next: NextFunction): Promise<Response<IPost>|undefined> {
        try{
        const { text, userId } = req.body;
            if(!await userService.getUserById(userId)){
                next(new Error('Not find this userId in users'));
                return;
            }
        const { id } = req.params;
        const update = await postService.updatePost(+id, text);
        return res.json(update);
        }catch (e){
            next(e)
        }
    }
}

export const postController = new PostController();
