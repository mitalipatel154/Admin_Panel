const express = require('express');

const port = 9000;

const app = express();

const path = require('path');

const flash = require('connect-flash');

const db = require('./config/db');

const cookieParser = require('cookie-parser');

const session = require('express-session');

const passport = require('./config/passportLocal');

app.set('view engine', 'ejs');

app.set("views",path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/uploads',express.static(path.join(__dirname, 'uploads')));

app.use(express.urlencoded());

app.use(cookieParser());

app.use(session({
    name : 'adminPanel',
    secret: 'MitaliPatel',
    saveUninitialized: true,
    resave: false,
    cookie : {
        maxAge : (1000 * 60 * 100)  
    }
}));

app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.use(passport.initialize());

app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use("/",require("./router/adminRoutes"));

db();

const categoryRoutes = require('./router/categoryRoutes');

app.use('/', categoryRoutes);

app.listen(port, (err) => {
    if(err){
        console.log(err);
        return false;
    }
    console.log(`Server is Running on http://localhost:${port}`);
})