const express = require('express');
const router = express.Router();
const utilities = require('../utilities');

router.get('/', (req, res) => {
  res.send('Sorry, the page you have requested cannot be found.');
});

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
