import {constants} from '../../constants';
import Joi from 'joi';

export const commonValidator = {
    emailValidator: Joi.string().regex(constants.EMAIL_REGEXP)
}