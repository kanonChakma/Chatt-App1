//get login page
function getLogin(req, res, next){
   res.render("index", {
       title: "Login-chat-app"
   })
}
module.exports ={
    getLogin
}