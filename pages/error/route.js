const template = require('./');
module.exports = {
  use404(req, res, next){
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  },
  
  error(err, req, res, next){
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    let errorData = {
      status: err.status || 500,
      message: err.message,
    };
    if(!config.isProduction){
      errorData.stack = err.stack;
    }

    if(err.status !== 404) logger.error(errorData);
    // render the error page
    //res.status(err.status || 500);
    res.marko(template, errorData);
  }
}