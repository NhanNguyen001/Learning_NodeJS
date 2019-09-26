class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    // When new obj is created and a constructor function is called
    // then that function call is not gonna appear in the stack trace
    // and will not pollute it
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
