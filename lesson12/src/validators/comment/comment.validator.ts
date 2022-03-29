import Joi from 'joi';

export const commentValidator = {
    createComment: Joi.object({
        text: Joi.string().required().min(3).max(100).message('Text is very long').trim(),
        authorId: Joi.number().required().max(100000).message('authorId is not valid'),
        postId: Joi.number().required().max(100000).message('postId is not valid')
    }),
    updateCommentLikeDislike: Joi.object({
        action: Joi.string().valid('like', 'dislike').required(),
        id: Joi.number().required().max(100000).message('Id is not valid')
    }),
    updateComment: Joi.object({
        id: Joi.number().required().max(100000).message('Id is not valid'),
        text: Joi.string().required().min(3).max(100).message('Text is very long').trim(),
        like: Joi.number().required(),
        dislike: Joi.number().required()
    }),

}