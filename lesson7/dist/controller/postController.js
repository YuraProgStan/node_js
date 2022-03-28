"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postController = void 0;
const postService_1 = require("../services/postService");
class PostController {
    async getPosts(req, res) {
        const posts = await postService_1.postService.getPosts();
        return res.json(posts);
    }
    async getPostByUserId(req, res) {
        const { userId } = req.params;
        const post = await postService_1.postService.getPostByUserId(Number(userId));
        return res.json(post);
    }
    async updatePost(req, res) {
        const { text } = req.body;
        const { id } = req.params;
        const update = await postService_1.postService.updatePost(+id, text);
        return res.json(update);
    }
}
exports.postController = new PostController();
//# sourceMappingURL=postController.js.map