import {NextFunction, Router, Request, Response} from 'express';

import {studentModel} from '../models/student';

const router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const createdStudent = await studentModel.create(req.body);
        res.json(createdStudent);
    } catch (e) {
        next(e);
    }
});

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        // const students = await studentModel.find({}).populate('teacher');
        const students = await studentModel.find({}).populate('teacher');
        res.json(students);
    } catch (e) {
        next(e)
    }
});

router.patch('/:student_id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatedStudent = await studentModel.findByIdAndUpdate(
            req.params.student_id,
            {teacher: '625581bc1306de938e9df559'},
            {new: true}
        );
        res.json(updatedStudent);
    } catch (e) {
        next(e)
    }
})
export const studentRouter = router