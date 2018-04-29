import { userInfo } from 'os';

const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const recipientSchema = require('./recipients');

const surveySchema = new Schema({
  title: String,
  subject: String,
  body: String,
  recipient: [recipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  dateSent: Date,
  dateResponded: Date
});

// create the collection
mongoose.model('surveys', surveySchema);
