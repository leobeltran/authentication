const LocalStrategy = require('passport-local').Strategy;

// Load user model
const User = require('../app/models/user');

module.exports = function(passport) {

// Serialize the user for a session
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
// Deserialize User
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user)
  });
});

passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},
function(req, email, password, done) {
  if (email)
    email = email.toLowerCase();

  // Async
  process.nextTick(function() {
    User.findOne({'local.email' : email}, (err, user) => {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, req.flash('loginMessage', 'No user found.'));
      }

      if (!user.validPassword(password)) {
         return done(null, false, req.flash('loginMessage', 'Ooops! Wrong Password.'));
      }

      return done(null, user);
    });
   });
 }));

// Local signup
passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
  },
  function(req, email, password, done) {
      if (email) {
        email = email.toLowerCase();
      }

      // Async
      process.nextTick(function() {
        if (!req.user) {
          User.findOne({'local.email' : email}, (err, user) => {
            if (err) {
              return done(err);
            }
            // if user exist, send message that it exist
            if (user) {
              return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {
              // crpassport = require('passport')eate new user
              const newUser = new User();
              newUser.local.email = email;
              newUser.local.password = newUser.generateHash(password);

              newUser.save((err) => {
                if (err) {
                  return done(err);
                }
                return done(null, newUser);
              });
            }
          });
        } else if (!req.user.local.email) {
          User.findOne({'local-email' : email}, (err, user) => {
            if (err) {
              return done(err);
            }

            if (user) {
              return done(null, false, req.flash('loginMessage', 'That email is already taken.'));
            } else {
              const user = req.user;
              user.local.email = email;
              user.local.password = user.generateHash(password);
              user.save((err) => {
                if (err) {
                  return done(null, user);
                }
              });
            }
          });
        } else {
          return done(null, req.user);
        }
      });
  }));

}
