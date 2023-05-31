const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getCurrentUser, getUserById, updateProfile, updateAvatar,
} = require('../controllers/user');
const regexUrl = require('../utils/regex');

router.get('/', getUsers);

router.get('/me', getCurrentUser);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(regexUrl),
  }),
}), updateAvatar);

module.exports = router;
