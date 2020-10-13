require("marko/node-require"); // Allow Node.js to require and load `.marko` files

const path = require('path');

const config = require('@config/environment');

const logger = require('morgan');
const cookieParser = require('cookie-parser');

const createError = require('http-errors');
const express = require('express');
const markoMiddleware = require("@marko/express").default;



const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


require('marko/browser-refresh').enable();

// Lasso setup | Configure lasso to control how JS/CSS/etc. is delivered to the browser
require('lasso').configure({
  plugins: [
      'lasso-marko', // Allow Marko templates to be compiled and transported to the browser
      'lasso-sass' // Allow sass
  ],
  outputDir: path.join(__dirname + '/static/dist/'), // Place all generated JS/CSS/etc. files into the "static" dir
  bundlingEnabled: config.isProduction, // Only enable bundling in production
  minify: config.isProduction, // Only minify JS and CSS code in production
  fingerprintsEnabled: config.isProduction, // Only add fingerprints to URLs in production
});
app.use(require('lasso/middleware').serveStatic());




app.use(markoMiddleware()); //enable res.marko(template, data)


require('./routes')(app);

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
