const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
require('./models/users');
require('./models/surveys');
require('./services/passport');
const { mongoURI, cookieKey } = require('./config/keys');

mongoose.Promise = global.Promise;
mongoose.connect(mongoURI);

const app = express();

app.use(bodyParser.json());

app.use(
  cookieSession({
    name: 'session',
    keys: [cookieKey],
    maxAge: 24 * 60 * 60 * 1000 * 7
  })
);

//Passport middlewares
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  app.get('*', (req, res) => {
    res.sendFile('index.html');
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);
