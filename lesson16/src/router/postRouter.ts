import { Router } from 'express';
import { postController } from '../controller/postController';
import {authMiddleware, validateMiddleware} from '../middlewares';

const router = Router();
router.get('/', postController.getPosts);
router.get('/:userId', postController.getPostByUserId);
router.post('/', validateMiddleware.isPostCreateValid, authMiddleware.checkAccessToken, postController.createPost);
router.patch('/:id', validateMiddleware.isPostUpdateValid, authMiddleware.checkAccessToken, postController.updatePost);
export const postRouter = router;
