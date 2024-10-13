const express = require('express');
const router = express.Router();
const passport = require('passport');
const indexRouter = require('./index');

//auth login
router.get('/login', (req, res) => {
  res.send('login page');
});
//auth logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      res.redirect(/error/);
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
  passport.authenticate('google', { failureRedirect: '/error/' }),
  (req, res) => {
    res.redirect('/profile/');
  }
);

module.exports = router;
