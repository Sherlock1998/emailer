const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = require('../config/keys');
const mongoose = require('mongoose');

//This is equivalent to the 'requires' above. If we use the traditional require, tests will import the collection several times and cause error.
const Users = mongoose.model('users');

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      new Users({
        googleID: profile.id
      }).save();
    }
  )
);
