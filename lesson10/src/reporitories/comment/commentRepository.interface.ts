import { UpdateResult } from 'typeorm';
import { IComment } from '../../entity/comment';

export interface ICommentRepository{
    getComments(): Promise<IComment[]>;
    getCommentsByUserId(userId: number): Promise<IComment[]>;
    updateCommentAction(commentId: number, action: string): Promise<UpdateResult | undefined | Error>;
}
