const jwt = require('jsonwebtoken');
const AuthError = require('../utils/errors/AuthError');

function auth(req, res, next) {
  const token = req.cookies.jwt;

  if (!token) {
    throw new AuthError('Необходима авторизация');
  }

  let payload;

  try {
    payload = jwt.verify(token, 'secret_key');
  } catch (err) {
    throw new AuthError('Необходима авторизация');
  }
  req.user = payload;
  next();
}

module.exports = { auth };
