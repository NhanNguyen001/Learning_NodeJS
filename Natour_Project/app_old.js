/* eslint-disable prettier/prettier */
const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1)MIDDLEWARE
if (process.env.NODE_ENV === 'development') {
  // Using morgan middleware
  app.use(morgan('dev'));
}
// Using json middleware to parse req.body
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// Example middleware
app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

// Using coverting date-time middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
