"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postService = void 0;
const postRepository_1 = require("../reporitories/post/postRepository");
class PostService {
    async getPosts() {
        return postRepository_1.postRepository.getPosts();
    }
    async getPostByUserId(userId) {
        return postRepository_1.postRepository.getPostByUserId(userId);
    }
    async updatePost(id, text) {
        return postRepository_1.postRepository.updatePost(id, text);
    }
}
exports.postService = new PostService();
//# sourceMappingURL=postService.js.map