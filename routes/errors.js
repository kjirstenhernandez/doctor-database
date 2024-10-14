const express = require('express');
const router = express.Router();
const utilities = require('../utilities');

// Error Page
router.get('/', (req, res) => {
  res.send('Sorry, the page you have requested cannot be found.');
});

// Testing error handler
router.get(
  '/example',
  utilities.errorHandler((req, res, next) => {
    try {
      const data = undefined;
      console.log(data.name);
      throw new Error('Example error');
    } catch (error) {
      next(error);
    }
  })
);

module.exports = router;
