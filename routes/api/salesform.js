const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
const passport = require("passport");
const axios = require("axios")

const stripe = require("stripe")(keys.stripeSecretKey);

const User = require("../../models/User");

/* POST a payment method */
router.post('/order', passport.authenticate('jwt', {session: false}), async (req, res) => {

    console.log(req.body)

    User.findById(req.user._id).then(user=>{
       let selectedCard = user.payments.id(req.body.card)
       stripe.tokens.create({
           card: {
               number: selectedCard.cardnumber,
               exp_month: selectedCard.token.card.exp_month,
               exp_year: selectedCard.token.card.exp_year,
               cvc: '123'
           }
       })
       .then(token=> {
            try {
                stripe.customers
                .create({
                    name: req.body.shipping.ship_first_name + req.body.shipping.ship_last_name,
                    email: req.user.email,
                    source: token.id
                })
                .then(customer => {
                        stripe.charges.create({
                            amount: req.body.amount,
                            currency: "usd",
                            customer: customer.id,
                            description: 'Soniclean Order'
                        }).then(async (charges)=> {
                            try {
                                let response = await axios.post('https://api.cartrover.com/v1/cart/orders/cartrover?api_user=50867OywbXA9&api_key=6Mg5XJet1t4qsGG', req.body.shipping)
                                let data = await response.data
                                if(data.success_code) {
                                    res.json(data);
                                } else {
                                    res.status(400).json(data.message);
                                }
                              } catch (e) {
                                return res.status(400).json({message: 'Failed to send order'});
                              }
                        })
                        .catch(err=>{
                            return res.status(400).json({message: 'Failed to charge stripe'});
                        })
                    }
                )
                .catch(err => console.log(err));
            } catch (err) {
                return res.status(400).json({message: 'Failed to create stripe token'});
            }
       })
       
    })

    
})


module.exports = router;