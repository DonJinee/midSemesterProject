const Joi = require('joi');

const authSchema = Joi.object({
    firstName: Joi.string().uppercase().required(),
    lastName: Joi.string().uppercase().required(),
    gender: Joi.string().max(1),
    email: Joi.string().email().lowercase().required()
}).options({allowUnknown: true});

module.exports = authSchema;