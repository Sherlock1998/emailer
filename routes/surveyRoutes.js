const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const surveyTemplates = require('../services/emailTemplates/surveyTemplates');
const Mailer = require('../services/mailer');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
    const { title, body, subject, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });
    // console.log(survey.title);
    // console.log(survey.body);
    // console.log(survey.subject);
    console.log(survey.recipients);
    const mailer = new Mailer(survey, surveyTemplates(survey));
    mailer.send();
  });
};

// const survey = { title: '1', body: '2', subject: '3', recipients: 'howyoongjian98@gmail.com'}
// axios.post('/api/surveys', survey)
