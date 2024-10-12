const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Sorry, the page you have requested cannot be found.');
});

module.exports = router;
