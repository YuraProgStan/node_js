import Joi from 'joi';

export const postValidator = {
    createPost: Joi.object({
        title: Joi.string().required().min(10).max(50).message('Title is not valid').trim(),
        text: Joi.string().required().max(200).message('Text is very long').trim(),
        userId: Joi.number().required().max(100000).message('Userid is not valid')
    }),
    updatePost:Joi.object({
        id: Joi.string().required(),
        title: Joi.string().required().min(10).max(50).message('Title is not valid').trim(),
        text: Joi.string().required().max(200).message('Text is very long').trim(),
        userId: Joi.number().required().max(100000).message('Userid is not valid')
    })

}