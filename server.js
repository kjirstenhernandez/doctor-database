const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const mongodb = require('./data/database');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const passportSetup = require('./utilities/passport-setup');
const passport = require('passport');
const cookieSession = require('cookie-session');
const dotenv = require('dotenv').config;

// Cookie and Session
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
  })
);

// -- Fix for req.session.regenerate error with Passport 0.6.0
app.use(function (request, response, next) {
  if (request.session && !request.session.regenerate) {
    request.session.regenerate = (cb) => {
      cb();
    };
  }
  if (request.session && !request.session.save) {
    request.session.save = (cb) => {
      cb();
    };
  }
  next();
});

//Initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow_origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

//EJS View Engine
app.use(expressLayouts);
app.set('layout', './layouts');
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./routes'));

//Error-handling Middleware Route
app.use(async (err, req, res, next) => {
  console.error(`Error at: "${req.originalUrl}": ${err.message}`);
  if (err.status == 404) {
    res.status(404).send({ error: 'Resource not found' });
  } else {
    res.status(500).send({ error: 'Oh no! There was a crash.  Maybe try a different route?' });
  }
});

//Connect to our database)
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening; node running on port ${port}`);
    });
  }
});
