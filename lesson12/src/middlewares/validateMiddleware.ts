import { Response, NextFunction } from 'express';
import { IRequestExtended } from '../interfaces';
import {ErrorHandler} from '../error/ErrorHandler';
import {authValidator, commentValidator, postValidator} from '../validators';

class ValidateMiddleware {
    public isLoginValid(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {error, value} = authValidator.loginUpdate.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.details[0].message));
                return;
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    }
    public isUpdateValid(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {error, value} = authValidator.loginUpdate
                .validate({password: req.body.password, email: req.body.email });

            if (error) {
                next(new ErrorHandler(error.details[0].message));
                return;
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    }
    public isRegistrationValid(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {error, value} = authValidator.registration.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.details[0].message));
                return;
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    }
    public isPostCreateValid(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {error, value} = postValidator.createPost.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.details[0].message));
                return;
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    }
    public isPostUpdateValid(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            let validateData = req.params;
            const {title, text, userId} = req.body;
            let {error} = postValidator.updatePost.validate({...validateData,title, text, userId});
            if (error) {
                next(new ErrorHandler(error.details[0].message));
                return;
            }
            next();
        } catch (e) {
            next(e);
        }
    }
    public isCommentCreateValid(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {error, value} = commentValidator.createComment.validate(req.body);
            console.log(value);
            if (error) {
                next(new ErrorHandler(error.details[0].message));
                return;
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    }
    public isCommentUpdateLikeDislikeValid(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const validateData = req.params;
            const {id} = req.body;
            let {error} = commentValidator.updateCommentLikeDislike.validate({...validateData,id});
            if (error) {
                next(new ErrorHandler(error.details[0].message));
                return;
            }
            next();
        } catch (e) {
            next(e);
        }
    }

    public isCommentUpdateValid(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const validateData = req.params;
            const {text, like, dislike} = req.body;
            let {error} = commentValidator.updateComment.validate({...validateData, text, like, dislike});
            if (error) {
                next(new ErrorHandler(error.details[0].message));
                return;
            }
            next();
        } catch (e) {
            next(e);
        }
    }
}
export const validateMiddleware = new ValidateMiddleware();
