module.exports = function(app) {
  // show the home page
  app.get('/', (req, res) => {
    res.render('index.ejs');
  });

  app.get('/profile', (req, res) =>  {
    res.render('profile.js', {
      user: req.user
    });
  });

// Local strategy
app.get('/login', (req, res) =>{
  res.render('login.ejs', {message: req.flash('loginMessage')});
});

// signup//Show the form
app.get('/signup', (req, res) =>{
  res.render('signup.ejs', {message: req.flash('signupMessage')});
});

// sign'em up
app.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
}));
}
