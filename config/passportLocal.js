const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcrypt');

const Admin = require('../models/adminModel');

passport.use('local', new LocalStrategy({
            usernameField: 'email'
        }, async function(email, password, done) {
            try {
                let adminRecord = await Admin.findOne({
                    email: email
                });
                if (!adminRecord) {
                    console.log("Email Not Found");
                    return done(null, false);
                }
                const isMatch = await bcrypt.compare(
                    password,
                    adminRecord.password
                );
                if (!isMatch) {
                    console.log("Wrong Password");
                    return done(null, false);
                }
                console.log("Login Successful");
                return done(null, adminRecord);
            } catch (err) {
                console.log(err);
                return done(err);
            }
        }
    )
);

passport.serializeUser(function(user, done){
    return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const admin = await Admin.findById(id);
        done(null, admin);
    } catch (err) {
        done(err);
    }
});

passport.setAuthenticated = function(req, res, next){

    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/');
}

passport.setAuthenticatedUser = function(req, res, next){

    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }

    next();
}

module.exports = passport;