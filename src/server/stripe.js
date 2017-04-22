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
  
  const charge = stripe.charges.create({
    // amount: chargeAmount,
    amount: 50,
    currency: "usd",
    description: `New Membership: ${membership}`,
    metadata: { name: name, email: email },
    source: token
    
  }, function(err, charge){
    if(err){res.send(err)}
    else {
      console.log("Charge Succesful", charge)
      res.status(200)
    }
  })
}

function calculateCharge(membership) {
    if(membership === "basic") {
      return 1250;
    } else if (membership === "premium") {
      return 1750;
    }
  }

// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
