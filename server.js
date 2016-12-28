// set-up
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const configDB = require('./config/database');

// configDB
mongoose.connect(configDB.url);
require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser()); // read cookies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ejs set-up for templating
app.set('view engine', 'ejs');

// create session
app.use(session({
  secret: 'welovefviwelovefviwelovefviwelovefvi',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize()); // begin using passport
app.use(passport.session()); // persistence between logins
app.use(flash());

// routes
require('./app/routes')(app, passport);


app.listen(PORT, () => {
  console.log(`The app is alive at port ${PORT}`);
});
