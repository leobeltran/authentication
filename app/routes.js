module.exports = function(app, passport) {
  // Show the home page
  app.get('/', (req, res) => {
    res.render('index.ejs');
  });

  //Show the user profile
  app.get('/profile', isLoggedIn, (req, res) =>  {
    res.render('profile.js', {
      user: req.user
    });
  });

// Sign out of profile - redirect to root '/'
app.get('/logout', (req, res) => {
  res.redirect('/');
});

// Local strategy - Login / show log in form
app.get('/login', (req, res) =>{
  res.render('login.ejs', {message: req.flash('loginMessage')});
});

// Authenticating login credentials
app.post('/login', passport.authenticate('local-login', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
}));

// Local strategy - Sign up / show sign up form
app.get('/signup', (req, res) =>{
  res.render('signup.ejs', {message: req.flash('signupMessage')});
});

// Create new User - signem up
app.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
}));


}

// Check if user is signed in - authenticate them
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}
