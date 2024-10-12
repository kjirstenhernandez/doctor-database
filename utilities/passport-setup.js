const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const dotenv = require('dotenv').config();
const users = require('../controllers/users');

passport.serializeUser((user, done) => {
  done(null, user.googleId);
});

passport.deserializeUser((id, done) => {
  users.getUserById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      // options for google strategy
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const currentUser = await users.getUser(profile);

        if (currentUser) {
          done(null, currentUser);
        } else {
          const newUser = await users.createUser(profile);
          done(null, newUser);
        }
      } catch (err) {
        done(err, null);
      }
    }
  )
);
