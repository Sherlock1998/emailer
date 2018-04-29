const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const recipientSchema = new Schema({
  email: String,
  responded: { type: Boolean, default: false }
});

// create the collection
module.exports = recipientSchema;
