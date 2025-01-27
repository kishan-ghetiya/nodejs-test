const Joi = require('joi');

exports.create = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .min(8)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[a-zA-Z\\d@$!%*?&]{8,30}$'))
        .required(),
    role: Joi.string().valid('user', 'admin').required(),
});

exports.update = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    role: Joi.string().valid('user', 'admin'),
});
