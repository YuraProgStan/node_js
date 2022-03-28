import { Router } from 'express';
import { postController } from '../controller/postController';

const router = Router();
router.get('/', postController.getPosts);
router.get('/:userId', postController.getPostByUserId);
router.patch('/:id', postController.updatePost);
export const postRouter = router;
