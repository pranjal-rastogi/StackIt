const Joi = require('joi');

// Validation schemas
const authSchemas = {
  register: Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  }),
  
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
};

const questionSchemas = {
  create: Joi.object({
    title: Joi.string().min(10).max(200).required(),
    description: Joi.string().min(20).required(),
    tags: Joi.array().items(Joi.string().min(2).max(20)).max(5).optional()
  }),
  
  update: Joi.object({
    title: Joi.string().min(10).max(200).optional(),
    description: Joi.string().min(20).optional(),
    tags: Joi.array().items(Joi.string().min(2).max(20)).max(5).optional()
  })
};

const answerSchemas = {
  create: Joi.object({
    content: Joi.string().min(10).required(),
    questionId: Joi.string().required()
  }),
  
  update: Joi.object({
    content: Joi.string().min(10).required()
  })
};

// Validation middleware factory
const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);
    if (error) {
      return res.status(400).json({
        message: 'Validation error',
        details: error.details.map(detail => detail.message)
      });
    }
    next();
  };
};

module.exports = {
  validate,
  authSchemas,
  questionSchemas,
  answerSchemas
}; 