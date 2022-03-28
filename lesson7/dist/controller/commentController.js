"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentController = void 0;
const commentService_1 = require("../services/commentService");
class CommentController {
    async getComments(req, res) {
        const comments = await commentService_1.commentService.getComments();
        return res.json(comments);
    }
    async getCommentsByUserId(req, res) {
        const { userId } = req.params;
        const comments = await commentService_1.commentService.getCommentsByUserId(+userId);
        return res.json(comments);
    }
    async updateCommentAction(req, res) {
        const { commentId } = req.body;
        const { action } = req.params;
        await commentService_1.commentService.updateCommentAction(+commentId, action);
        return res.sendStatus(201);
    }
}
exports.commentController = new CommentController();
//# sourceMappingURL=commentController.js.map