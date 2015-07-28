var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var User  = require('../models').User;

passport.use(new BasicStrategy(
    function(username, password, callback) {
        // get user from db
        User.findOne({
            where: {
                username: username,
                password: password
            }
        }).then(function(user) {
            // no user found with that username and password
            if (!user) {
                return callback(null, false);
            }

            // success
            return callback(null, user);

        }).catch(function(err) {
            return callback(err);
        });
    }
));

exports.isAuthenticated = passport.authenticate('basic', { session : false });
