module.exports = function(app) {
  // show the home page
  app.get('/', (req, res) => {
    res.render('index.ejs');
  });

// Local strategy
app.get('/login', (req, res) =>{
  res.render('login.ejs')
});

app.get('/signup', (req, res) =>{
  res.render('signup.ejs')
});
}
