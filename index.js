const express = require('express');
require('dotenv').config({path: './.env'})
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static('public'))

class Customer {
  constructor(email, name, address, city, state, zip, country) {
    this.email = email
    this.name = name
    this.address = address
    this.city = city
    this.state = state
    this.zip = zip
    this.country = country
  }
}

const customer = new Customer()
customer.name = "John Doe"
customer.email = "test@test.com"
customer.phone = "1234567890"
customer.address = "123 Main St"
customer.city = "San Francisco"
customer.state = "CA"
customer.zip = "94105"
customer.country = "US"


// Create a new customer and then a new charge for that customer:
var createCustomer = function() {
    return stripe.customers.create({
        email: customer.email,
        name: customer.name,
        phone: customer.phone,
        address: {
            line1: customer.address,
            city: customer.city,
            state: customer.state,
            postal_code: customer.zip,
            country: customer.country
        }

    }).catch(function(err) {
        console.log(err);
    })
}

// Retrieve a customer
var retrieveCustomer = function(customer) {
    return stripe.customers.retrieve(customer.id)
}

// Create Token
var createToken = function() {
    return stripe.tokens.create({
        card: {
            "number": '4242424242424242',
            "exp_month": 12,
            "exp_year": 2026,
            "cvc": '123'
        }
    });
}

// Add a card to a customer
var addCard = function(customer) {
    return stripe.customers.createSource(customer.id, {
        source: 'tok_visa'
    });
}



// Charge the customer's card:
var chargeCustomer = function(customer) {
    return stripe.charges.create({
        amount: 1000,
        currency: 'usd',
        customer: customer.id
    });
}

createCustomer()
console.log("------------------------")




app.get('/', (req, res) => res.send('Stripe Payment Service!'));


app.listen(port, () => console.log(`Stripe Payment Service listening on port http://localhost:${port} !`))


