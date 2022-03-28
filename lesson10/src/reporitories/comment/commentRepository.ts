import {
    EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';
import { IComment, Comment } from '../../entity/comment';
import { ICommentRepository } from './commentRepository.interface';

@EntityRepository(Comment)
class CommentRepository extends Repository<Comment> implements ICommentRepository {
    public async getComments(): Promise<IComment[]> {
        return getManager().getRepository(Comment).find();
    }

    public async getCommentsByUserId(userId: number): Promise<IComment[]> {
        return getManager().getRepository(Comment)
            .createQueryBuilder('comment')
            .where('comment.authorId = :id', { id: userId })
            .leftJoinAndSelect('comment.user', 'user')
            .leftJoinAndSelect('comment.post', 'post')
            .getMany();
    }

    // eslint-disable-next-line consistent-return
    public async updateCommentAction(
        commentId: number,
        action: string,
    )
        : Promise<UpdateResult | undefined | Error> {
        try {
            const query = getManager().getRepository(Comment);
            const comment = await query.createQueryBuilder('comment')
                .where('comment.id = :id', { id: commentId }).getOne();

            if (!comment) {
                throw new Error('wrong comment ID');
            }

            if (action === 'like') {
                return query.update({ id: commentId }, { like: comment.like + 1 });
            }

            if (action === 'dislike') {
                return query.update({ id: commentId }, { dislike: comment.like + 1 });
            }
        } catch (e) {
            console.log(e);
        }
    }

    // public async updatePost(id: number, text: string): Promise<UpdateResult> {
    //     return getManager().getRepository(Post).update({ id }, { text });
    // }
// app.patch('/comments/action', async (req: Request, res: Response) => {
//     try {
//         const { action, commentId } = req.body;
//         const queryRunner = getManager().getRepository(Comment);
//         const comment = await queryRunner.createQueryBuilder('comment')
//             .where('comment.id = :id', { id: commentId })
//             .getOne();
//
//         if (!comment) {
//             throw new Error('wrong comment ID');
//         }
//
//         if (action === 'like') {
//             await queryRunner.update({ id: commentId }, { like: comment.like + 1 });
//         }
//         if (action === 'dislike') {
//             await queryRunner.update({ id: commentId }, { dislike: comment.dislike + 1 });
//         }
//
//         res.sendStatus(201);
//     } catch (e) {
//         console.log(e);
//     }
// });
}

export const commentRepository = new CommentRepository();
