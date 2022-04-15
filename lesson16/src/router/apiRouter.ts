import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import { userRouter } from './userRouter';
import { authRouter } from './authRouter';
import { postRouter } from './postRouter';
import { commentRouter } from './commentRouter';
import { chatRouter } from './chatRouter';
import {studentRouter} from "./studentRouter";
import {teacherRouter} from "./teacherRouter";

import * as docs from '../docs/swagger.json';


const router = Router();

router.use('/docs', swaggerUi.serve, swaggerUi.setup(docs));
router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/posts', postRouter);
router.use('/comments', commentRouter);
router.use('/chat', chatRouter);
router.use('/students', studentRouter);
router.use('/teachers', teacherRouter);

export const apiRouter = router;
