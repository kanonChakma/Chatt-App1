//get login page
function getUsers(req, res, next){
    res.render("users", {
        title: "users-Chat app"
    })
 }
 module.exports ={
     getUsers
 }