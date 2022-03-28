"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRepository = void 0;
const typeorm_1 = require("typeorm");
const comment_1 = require("../../entity/comment");
let CommentRepository = class CommentRepository extends typeorm_1.Repository {
    async getComments() {
        return (0, typeorm_1.getManager)().getRepository(comment_1.Comment).find();
    }
    async getCommentsByUserId(userId) {
        return (0, typeorm_1.getManager)().getRepository(comment_1.Comment)
            .createQueryBuilder('comment')
            .where('comment.authorId = :id', { id: userId })
            .leftJoinAndSelect('comment.user', 'user')
            .leftJoinAndSelect('comment.post', 'post')
            .getMany();
    }
    // eslint-disable-next-line consistent-return
    async updateCommentAction(commentId, action) {
        try {
            const query = (0, typeorm_1.getManager)().getRepository(comment_1.Comment);
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
        }
        catch (e) {
            console.log(e);
        }
    }
};
CommentRepository = __decorate([
    (0, typeorm_1.EntityRepository)(comment_1.Comment)
], CommentRepository);
exports.commentRepository = new CommentRepository();
//# sourceMappingURL=commentRepository.js.map