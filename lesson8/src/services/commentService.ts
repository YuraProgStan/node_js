import { UpdateResult } from 'typeorm';
import { IComment } from '../entity/comment';
import { commentRepository } from '../reporitories/comment/commentRepository';

class CommentService {
    public async getComments(): Promise<IComment[]> {
        return commentRepository.getComments();
    }

    public async getCommentsByUserId(userId:number): Promise<IComment[]> {
        return commentRepository.getCommentsByUserId(userId);
    }

    public async updateCommentAction(commentId:number, action: string)
        :Promise<UpdateResult | undefined | Error> {
        return commentRepository.updateCommentAction(commentId, action);
    }
}

export const commentService = new CommentService();
