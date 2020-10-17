const errors = require('@pages/error/route');
module.exports = function(app){
  app.use('/', require('@pages/home/route.js'));
  app.use('/streaming', require('@pages/streaming-test/route.js'));
  app.use('/search', require('@pages/search/route.js'));
  app.use(errors.use404);
  app.use(errors.error)
};
