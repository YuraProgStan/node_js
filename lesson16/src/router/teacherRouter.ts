import {NextFunction, Router, Request,Response } from 'express';

import { teacherModel } from '../models/teacher';

const router = Router();

router.post('/', async (req: Request, res:Response, next:NextFunction) => {
   try{
       const createdTeacher = await teacherModel.create(req.body);
       res.json(createdTeacher);
   }
    catch (e){
       next(e);
    }
})
router.get('/', async (req: Request, res:Response, next:NextFunction) =>{
    try {
        const teachers =  await teacherModel.findOne({});
        res.json(teachers);
    }
    catch (e){
        next(e)
    }
})
export const teacherRouter = router