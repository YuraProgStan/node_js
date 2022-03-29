import {NextFunction, Request, Response} from 'express';
import { IComment } from '../entity/comment';
import {commentService, postService, userService} from '../services/';

class CommentController {
    public async getComments(req: Request, res: Response): Promise<Response<IComment>> {
        const comments = await commentService.getComments();
        return res.json(comments);
    }

    public async createComment(req: Request, res: Response, next: NextFunction): Promise<Response<IComment>|undefined>{
        try{
            const { authorId, postId} = req.body;
            if(! await userService.getUserById(authorId)){
                next(new Error('Not find this userId in users'));
                return;
            }
            if(! await postService.getPostByUserId(postId)){
                next(new Error('Not find this postId in users'));
                return;
            }
            const comment = await commentService.createComment(req.body);
            return res.json(comment);
        }
        catch (e){
            next(e);
        }
    }
    public async updateComment(req: Request, res: Response, next: NextFunction): Promise<Response<IComment>|undefined>{
        try{
            const { id } = req.params;
            if(! await commentService.getCommentById(+id)){
                next(new Error('Not find this userId in users'));
                return;
            }
            const{ text, like, dislike} = req.body;
            const update = await commentService.updateComment(+id, text, like, dislike);
            return res.json(update);
        }
        catch (e){
            next(e);
        }
    }

    public async getCommentsByUserId(req: Request, res: Response): Promise<Response<IComment[]>> {
        const { userId } = req.params;
        const comments = await commentService.getCommentsByUserId(+userId);
        return res.json(comments);
    }

    public async updateCommentAction(req: Request, res: Response): Promise<Response<IComment>> {
        const { id } = req.body;
        const { action } = req.params;
        await commentService.updateCommentAction(+id, action);
        return res.sendStatus(201);
    }
}

export const commentController = new CommentController();
