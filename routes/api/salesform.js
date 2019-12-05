const express = require('express');
const router = express.Router();
const keys = require('../../config/keys');
const passport = require('passport');
const axios = require('axios');

const stripe = require('stripe')(keys.stripeSecretKey);

const User = require('../../models/User');
const Orders = require('../../models/Orders');

/* POST a payment method */
router.post(
  '/order/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    console.log(req.body);

    if (req.body.card === 'mohawk') {
      ///////////// via Mohawk Account ///////////////
      try {
        let response = await axios.post(
          `https://api.cartrover.com/v1/cart/orders/cartrover?api_user=${keys.CartRoverApiUser}&api_key=${keys.CartRoverApiKey}`,
          req.body.order
        );
        let data = await response.data;

        if (data.success_code) {
          const order = new Orders({
            payment_type: 'mohawk',
            mohawk_account: req.body.mohawk_account,
            success_code: data.success_code,
            cust_ref: data.cust_ref,
            order_number: data.order_number,
            createdBy: req.params.id,
            order_status: 'In process',
          });

          order.save().then(orderData => {
            res.json(orderData);
          });
        } else {
          res.status(400).json(data.message);
          const order = new Orders({
            payment_type: 'mohawk',
            mohawk_account: req.body.mohawk_account,
            success_code: data.success_code,
            cust_ref: data.cust_ref,
            order_number: data.order_number,
            createdBy: req.params.id,
            order_status: '',
          });

          order.save().then(orderData => {
            res.json(orderData);
          });
        }
      } catch (e) {
        return res.status(400).json({ message: 'Failed to send order' });
      }
    } else {
      ///////////// via credit card ///////////////
      User.findById(req.params.id).then(user => {
        let selectedCard = user.payments.id(req.body.card);
        stripe.tokens
          .create({
            card: {
              number: selectedCard.cardnumber,
              exp_month: selectedCard.token.card.exp_month,
              exp_year: selectedCard.token.card.exp_year,
              cvc: '123',
            },
          })
          .then(token => {
            try {
              stripe.customers
                .create({
                  name:
                    req.body.order.ship_first_name +
                    req.body.order.ship_last_name,
                  email: user.email,
                  source: token.id,
                })
                .then(customer => {
                  stripe.charges
                    .create({
                      amount: req.body.amount * 100,
                      currency: 'usd',
                      customer: customer.id,
                      description: 'Soniclean Order',
                    })
                    .then(async charges => {
                      try {
                        let response = await axios.post(
                          `https://api.cartrover.com/v1/cart/orders/cartrover?api_user=${keys.CartRoverApiUser}&api_key=${keys.CartRoverApiKey}`,
                          req.body.order
                        );
                        let data = await response.data;

                        if (data.success_code) {
                          const order = new Orders({
                            payment_type: 'stripe',
                            mohawk_account: req.body.mohawk_account,
                            success_code: data.success_code,
                            cust_ref: data.cust_ref,
                            order_number: data.order_number,
                            createdBy: req.params.id,
                            order_status: 'In process',
                          });

                          order.save().then(orderData => {
                            res.json(orderData);
                          });
                        } else {
                          res.status(400).json(data.message);
                          const order = new Orders({
                            payment_type: 'stripe',
                            mohawk_account: req.body.mohawk_account,
                            success_code: data.success_code,
                            cust_ref: data.cust_ref,
                            order_number: data.order_number,
                            createdBy: req.params.id,
                            order_status: '',
                          });

                          order.save().then(orderData => {
                            res.json(orderData);
                          });
                        }
                      } catch (e) {
                        return res
                          .status(400)
                          .json({ message: 'Failed to send order' });
                      }
                    })
                    .catch(err => {
                      return res
                        .status(400)
                        .json({ message: 'Failed to charge stripe' });
                    });
                })
                .catch(err => console.log(err));
            } catch (err) {
              return res
                .status(400)
                .json({ message: 'Failed to create stripe token' });
            }
          });
      });
    }
  }
);

module.exports = router;
