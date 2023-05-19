const router = require('express').Router();
const {
  getUsers, getCurrentUser, createUser, updateProfile, updateAvatar,
} = require('../controllers/user');

router.get('/', getUsers);

router.get('/:userId', getCurrentUser);

router.post('/', createUser);

router.patch('/me', updateProfile);

router.patch('/me/avatar', updateAvatar);

module.exports = router;
