import { Request, Response } from 'express';
import { IComment } from '../entity/comment';
import { commentService } from '../services/commentService';

class CommentController {
    public async getComments(req: Request, res: Response): Promise<Response<IComment>> {
        const comments = await commentService.getComments();
        return res.json(comments);
    }

    public async getCommentsByUserId(req: Request, res: Response): Promise<Response<IComment[]>> {
        const { userId } = req.params;
        const comments = await commentService.getCommentsByUserId(+userId);
        return res.json(comments);
    }

    public async updateCommentAction(req: Request, res: Response): Promise<Response<IComment>> {
        const { commentId } = req.body;
        const { action } = req.params;
        await commentService.updateCommentAction(+commentId, action);
        return res.sendStatus(201);
    }
}

export const commentController = new CommentController();
