const Joi = require("joi");

const validateBook = Joi.object({
    title: Joi.string().required(),
    isbn: Joi.string().required(),
    pages: Joi.number().integer().required(),
    year: Joi.number().integer().required(),
    author_id: Joi.string().required(),
    publisher_id: Joi.string().required()
});

module.exports = validateBook;