const express = require("express");
const bodyParser = require('body-parser');
const stripe = require("stripe")("sk_test_tV2iuVwlKtIKFUM1KL3Nd1rL00UNEKGI86");

const PORT = 5000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let count = 0;

function createToken(number, expMonth, expYear, cvc) {
  let card = {};
  card.card = {
    number: `${number}`,
    exp_month: expMonth,
    exp_year: expYear,
    cvc: `${cvc}`
  }
  stripe.tokens.create(card, (error, token) => {
    if(error) {
      console.log(error);
    } else if (token) {
      console.log(token);
      // store token id
    } else {
      console.log("wtf");
    }
  });
};

function chargeCustomerThroughTokenID(amount, currency, description, source) {
  let param = {
    amount: `${amount}`,
    currency: currency,
    description: description,
    source: source
  }

  stripe.charges.create(param, (error, charge) => {
    if(error) {
      console.log(error);
    } else if (charge) {
      console.log(charge);
    } else {
      console.log("wtf");
    }
  });
};

// get routes

app.get("/", (req, res) => {
  res.sendFile( __dirname + "/public/" + "index.html" );
  count++;
  console.log(count);
});

app.get("/success", (req, res) => {
  res.sendFile( __dirname + "/public/" + "success.html" );
  console.log("success");
});

// ---------------------------------------------------------- //

// post routes

app.post('/', (req, res) => {
  // res.send('POST request to the homepage');

  console.log(req.body);
  // createToken(req.body.cardNumber, req.body.expMonth, req.body.expYear, req.body.cvc);
  // get token id
  let token = 'sdoksdoksodkosdk';
  chargeCustomerThroughTokenID(4000, 'usd', 'test description', token);
  res.redirect("/success");
  // res.redirect("/failure");
})

// ---------------------------------------------------------- //

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
})
