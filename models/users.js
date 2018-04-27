const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const userSchema = new Schema({
  googleID: String,
  credits: { type: Number, default: 0 }
});

// create the collection
mongoose.model('users', userSchema);
