var stripe = Stripe('pk_live_ApEOv2BHUibXh2elxfbSkiLJ');
var elements = stripe.elements();

var card = elements.create('card', {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#8898AA',
      lineHeight: '36px',
      fontWeight: 300,
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSize: '19px',

      '::placeholder': {
        color: '#8898AA',
      },
    },
    invalid: {
      iconColor: '#e85746',
      color: '#e85746',
    }
  },
  classes: {
    focus: 'is-focused',
    empty: 'is-empty',
  },
});
card.mount('#card-element');

var inputs = document.querySelectorAll('input.field');
Array.prototype.forEach.call(inputs, function(input) {
  input.addEventListener('focus', function() {
    input.classList.add('is-focused');
  });
  input.addEventListener('blur', function() {
    input.classList.remove('is-focused');
  });
  input.addEventListener('keyup', function() {
    if (input.value.length === 0) {
      input.classList.add('is-empty');
    } else {
      input.classList.remove('is-empty');
    }
  });
});

function setOutcome(result) {
  var successElement = document.querySelector('.success');
  var errorElement = document.querySelector('.error');
  successElement.classList.remove('visible');
  errorElement.classList.remove('visible');

  if (result.token) {

    var form = document.querySelector('form');
    var customerDetails = {
      name: form.querySelector('input[name=cardholder-name]').value,
      email: form.querySelector('input[name=cardholder-email]').value,
      membership: document.getElementById('member-basic').checked ? "basic" : "premium"
    };

    const token = {stripeToken: result.token.id}
    const payload = JSON.stringify({ customerDetails, token })

    fetch('/charge', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: payload
    })
    successElement.querySelector('.token').textContent = "Payment Successful"
    successElement.classList.add('visible');
  } else if (result.error) {
    errorElement.textContent = result.error.message;
    errorElement.classList.add('visible');
  }
}

card.on('change', function(event) {
  setOutcome(event);
});

document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  stripe.createToken(card).then(setOutcome);
});
