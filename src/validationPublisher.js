const Joi = require("joi");

const validatePublisher = Joi.object({
    name_publisher: Joi.string().required(),
    city: Joi.string().required()
});


module.exports = validatePublisher;