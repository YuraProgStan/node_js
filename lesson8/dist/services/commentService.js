"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentService = void 0;
const commentRepository_1 = require("../reporitories/comment/commentRepository");
class CommentService {
    async getComments() {
        return commentRepository_1.commentRepository.getComments();
    }
    async getCommentsByUserId(userId) {
        return commentRepository_1.commentRepository.getCommentsByUserId(userId);
    }
    async updateCommentAction(commentId, action) {
        return commentRepository_1.commentRepository.updateCommentAction(commentId, action);
    }
}
exports.commentService = new CommentService();
//# sourceMappingURL=commentService.js.map