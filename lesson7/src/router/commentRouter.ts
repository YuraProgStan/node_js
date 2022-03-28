import { Router } from 'express';
import { commentController } from '../controller/commentController';

const router = Router();
router.get('/', commentController.getComments);
router.get('/:userId', commentController.getCommentsByUserId);
router.patch('/:action', commentController.updateCommentAction);

export const commentRouter = router;
