const secret = process.env.STRIPE_SECRET_KEY || 'sk_test_ABwmJVUE2uGS6vip3b5kepdf';

const stripe = require("stripe")(secret);
const express = require('express');

const router = express.Router()

router.post('/', handleCharge)

module.exports = router;

function handleCharge(req, res) {
  
  const { name, email, membership } = req.body.customerDetails;
  const token = req.body.token.stripeToken;
  const chargeAmount = calculateCharge(membership);
  
  stripe.customers.create({
    email: email,
    source: token
  }).then(function(customer){
    return stripe.charges.create({
      amount: chargeAmount,
      currency: "usd",
      description: `New Membership: ${membership}`,
      metadata: { name: name, email: email },
      customer: customer.id
    });
  }).then(function(charge){
    res.status(200).send(charge);
  }).catch(function(err){
    res.send(err);
  })
}

function calculateCharge(membership) {
    if(membership === "basic") {
      return 1250;
    } else if (membership === "premium") {
      return 1750;
    }
  }
