const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWARE
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use((req, res, next) => {
  console.log('Test request before through json middleware', req.body);
  next();
});

app.use(express.json());

app.use((req, res, next) => {
  console.log('Test request after through json middleware', req.body);
  next();
});

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});

// 2) ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  // If next function recive argument, no matter what it is, Express will automatically know that there was an error
  next(new AppError(`Can't find ${req.originalUrl} on this server!!!`, 404));
});

// Using 4 parameters let express recognize this is a error handling middleware
app.use(globalErrorHandler);

module.exports = app;
