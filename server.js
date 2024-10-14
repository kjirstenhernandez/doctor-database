const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const mongodb = require('./data/database');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const passportSetup = require('./utilities/passport-setup');
const passport = require('passport');
const initializePassport = require('./utilities/passport-setup');
const session = require('express-session');
const dotenv = require('dotenv').config;
const MemoryStore = require('memorystore')(session);

// Cookie and Session
app.use(
  session({
    store: new MemoryStore({
      checkPeriod: 86400000
    }),
    secret: [process.env.SESSION_SECRET]
  })
); // memoryleak solution found at https://stackoverflow.com/questions/44882535/warning-connect-session-memorystore-is-not-designed-for-a-production-environm

//Initialize passport
initializePassport();

app.use(passport.initialize());
app.use(passport.session());

// -- Fix for req.session.regenerate error with Passport 0.6.0
// app.use(function (req, response, next) {
//   if (req.session && !req.session.regenerate) {
//     req.session.regenerate = (cb) => {
//       cb();
//     };
//   }
//   if (req.session && !req.session.save) {
//     req.session.save = (cb) => {
//       cb();
//     };
//   }
//   console.log(req.session);
//   next();
// });

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow_origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

//EJS View Engine
app.use(expressLayouts);
app.set('layout', './layouts/layout');
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
