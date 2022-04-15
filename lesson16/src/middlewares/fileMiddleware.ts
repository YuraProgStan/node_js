import { IRequestExtended } from '../interfaces';
import { constants } from '../constants';
import {NextFunction, Response} from "express";
import {ErrorHandler} from '../error/ErrorHandler';
import {UploadedFile} from 'express-fileupload';

class FileMiddleware{
    async checkUserAvatar(req: IRequestExtended, res: Response, next: NextFunction){
        try{
            console.log('____________________________');
            console.log(req.files);
            console.log('____________________________');
            if(!req.files?.avatar){
            next();
            return;
            }

        const {name, size, mimetype} = req.files.avatar as UploadedFile;

        if(size > constants.PHOTO_MAX_SIZE){
        next(new ErrorHandler(`File ${name} is too big`));
        }

        if(!constants.PHOTOS_MIMETYPES.includes(mimetype)){
        next(new ErrorHandler('Wrong file format'));
        return;
        }

        next();
        }
        catch (e){
        next(e)
        }
    }
}

export const  fileMiddleware = new FileMiddleware();