const createError = require('http-errors');

//404 notFoundHandler
function notFoundHadnler(req, res, next){
  next(createError(404, "document not found!"))
}

//default error handler
function errorHandler(err, req, res, next) {
  res.locals.error = process.env.NODE_ENV === 'development'? err: {message: err.message};
  res.status(err.status || 500);

  if(req.locals.html){
      res.render('error', {
          title: "Error Page"
      });
  }else{
      res.json(res.locals.error);
  }

}

module.exports = {
    notFoundHadnler,
    errorHandler
}