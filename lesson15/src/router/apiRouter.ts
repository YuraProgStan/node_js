import { Router } from 'express';
import { userRouter } from './userRouter';
import { authRouter } from './authRouter';
import { postRouter } from './postRouter';
import { commentRouter } from './commentRouter';
import { chatRouter } from './chatRouter';


const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/posts', postRouter);
router.use('/comments', commentRouter);
router.use('/chat', chatRouter);


export const apiRouter = router;
