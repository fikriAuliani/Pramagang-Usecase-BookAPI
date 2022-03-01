const Joi = require("joi");

const validateAuthor = Joi.object({
    name_author: Joi.string().required()
});


module.exports = validateAuthor;