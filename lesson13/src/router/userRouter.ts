import { Router } from 'express';
import { userController } from '../controller/userController';
import {authMiddleware, validateMiddleware} from '../middlewares';

const router = Router();
router.get('/:email', userController.getUserByEmail);
// router.get('/', userController.getUsers);
router.get('/', userController.getUserPagination);
router.patch('/:id', authMiddleware.checkAccessToken, validateMiddleware.isUpdateValid, userController.updateUser);
router.delete('/:id', userController.deleteUser);

export const userRouter = router;
