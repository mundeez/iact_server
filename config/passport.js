var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');
const config = require('./../config/config');

passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function(username, password, done) {
    User.findOne({ email: username }, function (err, user) {
      if (err) { return done(err); }
      // Return if user not found in database
      if (!user) {
        return done(null, false, {
          error: config.errors.usrNotFound
        });
      }
      // Return if password is wrong
      if (!user.validatePassword(password)) {
        return done(null, false, {
          error: config.errors.passIncorrect
        });
      }
      // If credentials are correct, return the user object
      return done(null, user);
    });
  }
));