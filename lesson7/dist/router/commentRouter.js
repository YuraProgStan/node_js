"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRouter = void 0;
const express_1 = require("express");
const commentController_1 = require("../controller/commentController");
const router = (0, express_1.Router)();
router.get('/', commentController_1.commentController.getComments);
router.get('/:userId', commentController_1.commentController.getCommentsByUserId);
router.patch('/:action', commentController_1.commentController.updateCommentAction);
exports.commentRouter = router;
//# sourceMappingURL=commentRouter.js.map