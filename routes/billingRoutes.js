const { STRIPE_SECRET_KEY } = require('../config/keys');
const stripe = require('stripe')(STRIPE_SECRET_KEY);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  //Dont need to call requireLogin with () or it will run automatically when server starts
  app.post('/api/stripe', requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      source: req.body.id
    });

    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  });
};
