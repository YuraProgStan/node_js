import {constants} from '../../constants';
import Joi from 'joi';

export const commonValidator = {
    emailValidator: Joi.string().required().regex(constants.EMAIL_REGEXP),
    phoneValidator:Joi.string().required().regex(constants.PHONE_REGEXP)
}