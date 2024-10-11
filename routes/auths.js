const express = require('express');
const router = express.Router();
const passport = require('passport');

//auth login
router.get('/login', (req, res) => {
  res.send('login page');
});
//auth logout
router.get('/logout', (req, res) => {
  res.send('logout page');
});

//auth with google
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile']
  })
);

//google redirect
router.get(
  '/google/redirect',
  passport.authenticate('google', (req, res) => {
    res.send('cheers');
  })
);

module.exports = router;
