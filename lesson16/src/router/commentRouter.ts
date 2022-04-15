import { Router } from 'express';
import { commentController } from '../controller/commentController';
import {authMiddleware, validateMiddleware} from '../middlewares';

const router = Router();
router.get('/', commentController.getComments);
router.post('/', validateMiddleware.isCommentCreateValid, authMiddleware.checkAccessToken, commentController.createComment);
router.get('/:userId', commentController.getCommentsByUserId);
router.patch('/:id',  validateMiddleware.isCommentUpdateValid, commentController.updateComment);
router.patch('/action/:action',  validateMiddleware.isCommentUpdateLikeDislikeValid, commentController.updateCommentAction);


export const commentRouter = router;
