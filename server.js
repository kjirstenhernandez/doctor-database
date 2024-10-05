const express = require('express');
const app = express();
const mongodb = require('./data/database');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow_origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Future Error Handling:
// const ApiError = require('./utilities/error-handling/apiErrors)

//EJS View Engine
// app.set('view engine', 'ejs');

// Routes
app.use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening; node running on port ${port}`);
    });
  }
});
