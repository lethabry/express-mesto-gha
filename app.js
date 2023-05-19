const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

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

app.use((req, res, next) => {
  req.user = {
    _id: '6465fa2283a83e53fa7113e1',
  };
  next();
});

app.use(limiter);
app.use(helmet());

app.use('/users', require('./routes/user'));
app.use('/cards', require('./routes/card'));

app.use((req, res) => {
  res.status(404).send({ message: 'Страницы не существует' });
});

app.listen(PORT);
