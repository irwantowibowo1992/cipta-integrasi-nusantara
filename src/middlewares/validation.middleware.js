const Joi = require('joi');

class ValidationMiddleware {
    static validate(schema) {
        return (req, res, next) => {
            const { error } = schema.validate(req.body);
            // console.log(error);
            if (error) {
                const err = new Error(error.details[0].message)
                err.statusCode = 422
                return next(err)
            }
            next();
        };
    }
}

module.exports = ValidationMiddleware;