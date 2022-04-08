import {commonValidator} from '../common/common.validator';
import Joi from 'joi';

export const authValidator = {
    loginUpdate: Joi.object({
           email: commonValidator.emailValidator.message('Email not valid').trim(),
           password: Joi.string().required().min(8).message('Password not valid').trim()
       }),
    updateUser: Joi.object({
        firstName:Joi.string().required().min(2).trim(),
        lastName: Joi.string().required().min(2).trim(),
        phone: commonValidator.phoneValidator.message('Phone not valid').trim()
    }),

    registration: Joi.object({
        firstName:Joi.string().required().min(2).trim(),
        lastName: Joi.string().required().min(2).trim(),
        age: Joi.number().min(18).max(70).message('Age not valid'),
        phone: commonValidator.phoneValidator.message('Phone not valid').trim(),
        email: commonValidator.emailValidator.message('Email not valid').trim(),
        password: Joi.string().required().min(8).message('Password not valid').trim()
    }),

    email: Joi.object({
        email: commonValidator.emailValidator.message('Email not valid').trim()
    }),

    password: Joi.object({
        password: Joi.string().required().min(8).message('Password not valid').trim()
    })
}