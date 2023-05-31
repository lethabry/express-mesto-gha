const { Joi } = require('celebrate');
const regexUrl = require('../utils/regex');

const signInValidation = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
});

const signUpValidation = Joi.object().keys({
  name: Joi.string().min(2).max(30),
  about: Joi.string().min(2).max(30),
  avatar: Joi.string().regex(regexUrl),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
});

module.exports = { signInValidation, signUpValidation };
