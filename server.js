// set-up
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const configDB = require('./config/database');

// configDB
mongoose.connect(configDB.url);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ejs set-up for templating
app.set('view engine', 'ejs');

// routes
require('./app/routes')(app);


app.listen(PORT, () => {
  console.log(`The app is alive at port ${PORT}`);
});
