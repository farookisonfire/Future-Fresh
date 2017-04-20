const stripe = require("stripe")("sk_test_qdkgru5QBQHPHo3MxG4jdfeL");
const express = require('express');

const router = express.Router()

router.post('/', handleCharge)

module.exports = router;

function handleCharge(req, res) {
  const token = req.body.stripeToken;
  const charge = stripe.charges.create({
    amount: 1000,
    currency: "usd",
    description: "Future Fresh Farms membership charge",
    source: token
  }, function(err, charge){
    if(err){console.log(err)}
    else {console.log(charge)}
  })

  res.status(200)
}


// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
