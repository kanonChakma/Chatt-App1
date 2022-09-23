const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const {notFoundHadnler, errorHandler} = require('./middleware/common/errorHandler.js')
const longinRouter = require("./router/loginRouter");
const usersRouter = require("./router/usersRouter");
const inboxRouter = require("./router/inboxRouter");

const app = express();
dotenv.config();


//connect database
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("database connected"))
.catch((err) => console.log(err));

//request parser
app.use(express.json())
app.use(express.urlencoded({extended: true}));

//set view engine
app.set("view engine", "ejs");

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//parse cookie
app.use(cookieParser(process.env.COOKIE_SECRET))

//routing setup
app.use("/", longinRouter);
app.use("/users", usersRouter);
app.use("/inbox", inboxRouter);

//404 not found handler
app.use(notFoundHadnler);

//common error handler
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`app is listening to port ${process.env.PORT}`)
})