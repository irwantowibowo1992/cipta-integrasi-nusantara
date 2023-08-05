const Joi = require('joi');

const userValidationSchema = {
    create: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(15)
    }),

    login: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(15)
    })
};

module.exports = userValidationSchema;