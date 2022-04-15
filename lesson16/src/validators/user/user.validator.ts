import {commonValidator} from '../common/common.validator';
import Joi from 'joi';

export const userValidator = {
    updateUser: Joi.object({
        firstName:Joi.string().required().min(2).trim(),
        lastName: Joi.string().required().min(2).trim(),
        age: Joi.number().min(18).max(70).message('Age not valid'),
        phone: commonValidator.phoneValidator.message('Phone not valid').trim(),
        email: commonValidator.emailValidator.message('Email not valid').trim()
    })
}