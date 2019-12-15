//Packages
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./dbConfigUser');


//PassportAuthentification Functions
module.exports = function (passport) {
    passport.use(new LocalStrategy( {usernameField: 'email'}, (username, password, done) => {
            console.log(username + ' ' + password);
            User.findOne({email: username})
                .then( async (user) => {
                    console.log('Beim User ' + user); //Problem - user wird nicht gefunden
                    if (!user) {
                        console.log('Im If');
                        return done(null, false, { message: 'Incorrect username.' });
                    }
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(err) {throw err}
                        if(isMatch){return done(null, user);}
                    });
                })
        }
    ));

    passport.serializeUser((username, done) => { done (null, {email: username})});
    passport.deserializeUser((username, done) => { done (null, {email: username})});
};




