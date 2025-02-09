    import Joi from 'joi';

export const registerSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(3).required(),
});


export const loginSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().min(6).required(),
});

export const blogPostSchema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().min(10).required(),
    userId: Joi.string()
});