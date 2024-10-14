const express = require('express');
const router = express.Router();
const passport = require('passport');
const utilities = require('../utilities');

//auth login
router.get('/login', (req, res) => {
  res.redirect('/auth/google');
});
//auth logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      res.redirect('/error/');
    }
    res.redirect('/');
  });
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
  utilities.errorHandler(passport.authenticate('google', { failureRedirect: '/login' })),
  (req, res) => {
    res.redirect('/profile/');
  }
);

module.exports = router;
