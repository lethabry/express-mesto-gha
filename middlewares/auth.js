const jwt = require('jsonwebtoken');
const { ERROR_VALID } = require('../utils/constants');

function auth(req, res, next) {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(ERROR_VALID).send({ message: 'Необходима авторизация' });
  }

  let payload;

  try {
    payload = jwt.verify(token, 'secret_key');
  } catch (err) {
    return res.status(ERROR_VALID).send({ message: 'Необходима авторизация' });
  }
  req.user = payload;
  return next();
}

module.exports = { auth };
