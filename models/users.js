const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const userSchema = new Schema({
  //   name: String,
  //   password: String,
  //   email: String,
  googleID: String
});

// create the collection
mongoose.model('users', userSchema);
