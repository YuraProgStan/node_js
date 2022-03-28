"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = require("express");
const postController_1 = require("../controller/postController");
const router = (0, express_1.Router)();
router.get('/', postController_1.postController.getPosts);
router.get('/:userId', postController_1.postController.getPostByUserId);
router.patch('/:id', postController_1.postController.updatePost);
exports.postRouter = router;
//# sourceMappingURL=postRouter.js.map