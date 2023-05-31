const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { celebrate, errors } = require('celebrate');

const { createUser, login } = require('./controllers/user');
const { auth } = require('./middlewares/auth');
const NotFoundError = require('./utils/errors/NotFoundError');
const { signInValidation, signUpValidation } = require('./middlewares/validation');

const { PORT = 3000 } = process.env;
const app = express();

const limiter = rateLimit({
  windowMs: 900000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(limiter);
app.use(helmet());
app.use(cookieParser());

app.post('/signin', celebrate({
  body: signInValidation,
}), login);

app.post('/signup', celebrate({
  body: signUpValidation,
}), createUser);

app.use(auth);

app.use('/users', require('./routes/user'));
app.use('/cards', require('./routes/card'));

app.use((req, res, next) => {
  next(new NotFoundError('Страницы не существует'));
});

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  next();
});

app.listen(PORT);
