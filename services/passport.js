const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = require('../config/keys');
const mongoose = require('mongoose');

//This is equivalent to the 'requires' above. If we use the traditional require, tests will import the collection several times and cause error.
const Users = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Users.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await Users.findOne({ googleID: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      const user = await new Users({ googleID: profile.id }).save();
      done(null, user);
    }
  )
);
