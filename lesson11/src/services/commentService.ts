import {UpdateResult} from 'typeorm';
import {IComment} from '../entity/comment';
import {commentRepository} from '../reporitories/comment/commentRepository';

class CommentService {
    public async getComments(): Promise<IComment[]> {
        return commentRepository.getComments();
    }
public async createComment(comment: IComment):Promise<IComment>{
    return commentRepository.createComment(comment);
}
    public async getCommentsByUserId(userId:number): Promise<IComment[]> {
        return commentRepository.getCommentsByUserId(userId);
    }
    public async getCommentById(id:number): Promise<IComment[]> {
        return commentRepository.getCommentById(id);
    }

    public async updateCommentAction(commentId:number, action: string)
        :Promise<UpdateResult | undefined | Error> {
        return commentRepository.updateCommentAction(commentId, action);
    }
    public async updateComment(id:number, text: string, like: number, dislike: number): Promise<UpdateResult> {
        return commentRepository.updateComment(id, text, like, dislike);
    }
}

export const commentService = new CommentService();
