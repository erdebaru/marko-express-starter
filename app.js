require("marko/node-require"); // Allow Node.js to require and load `.marko` files

const logger = require('morgan');
const cookieParser = require('cookie-parser');

const createError = require('http-errors');
const express = require('express');
const markoExpress = require("marko/express");



const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(markoExpress()); //enable res.marko(template, data)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
