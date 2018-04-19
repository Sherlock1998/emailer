const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./models/users');
require('./services/passport');
const { mongoURI, cookieKey } = require('./config/keys');
mongoose.connect(mongoURI);

const app = express();

app.use(
  cookieSession({
    name: 'session',
    keys: [cookieKey],
    maxAge: 24 * 60 * 60 * 1000 * 7 // 7 days
  })
);

//Passport middlewares
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
const PORT = process.env.PORT || 3000;

app.listen(PORT);
