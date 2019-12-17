//Packages
/*const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./dbConfigUser').User;
cont jwt = require('jsonwebtoken');


//PassportAuthentification Functions
module.exports = function (passport) {
    passport.use(new LocalStrategy((username, password, done) => {
            console.log(username + ' ' + password);
            User.findOne({username: username})
                .then( async (user) => {
                    console.log('Beim User ' + user);
                    if (!user) {
                        console.log('Im If');
                        return done(null, false, { message: 'Incorrect username.' });
                    }
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(err) {throw err}
                        if(isMatch){
                            return done(null, user);
                        } else {
                            return done(null, false, { message: 'Incorrect password.' });
                        }
                    });
                })
        }
    ));

    passport.serializeUser((username, done) => { done (null, {username: username})});
    passport.deserializeUser((username, done) => { done (null, {username: username})});
};*/




