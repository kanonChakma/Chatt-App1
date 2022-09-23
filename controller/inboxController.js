//get login page
function getInbox(req, res, next){
    res.render("inbox", {
        title: "inbox- chat-app"
    })
 }
 module.exports ={
    getInbox
 }