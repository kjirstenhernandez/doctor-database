const express = require('express');
const router = express.Router();
const passport = require('passport');

// Build profile view for authenticated viewers

router.get('/', (req, res) => {
  if (!req.user) {
    res.redirect('/auth/login');
  } else {
    res.send(`Welcome to your profile, ${req.user.firstName}!`);
  }
});

module.exports = router;
