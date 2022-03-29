import { UpdateResult } from 'typeorm';
import { IComment } from '../../entity/comment';

export interface ICommentRepository{
    getComments(): Promise<IComment[]>;
    getCommentsByUserId(userId: number): Promise<IComment[]>;
    getCommentById(id: number): Promise<IComment[]>;
    updateCommentAction(commentId: number, action: string): Promise<UpdateResult | undefined | Error>;
    updateComment(id: number, text: string, like: number, dislike: number ): Promise<UpdateResult>;
    createComment(comment: IComment): Promise<IComment>;
}
