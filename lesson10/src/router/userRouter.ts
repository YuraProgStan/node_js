import { Router } from 'express';
import { userController } from '../controller/userController';

const router = Router();
router.get('/:email', userController.getUserByEmail);
router.get('/', userController.getUsers);
router.patch('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/', userController.createUser);

export const userRouter = router;
