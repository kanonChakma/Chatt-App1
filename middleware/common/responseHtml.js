function responseHtml(page_name){
    return function(req, res, next){
      res.locals.html = true;
      res.locals.title = `${page_name}-${process.env.APP_NAME}`
     next();
    }
}
module.exports = responseHtml;