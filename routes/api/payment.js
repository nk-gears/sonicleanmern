const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
const stripe = require("stripe")(keys.stripePublicKey);
const passport = require("passport");

const User = require("../../models/User");
const PaymentMethod = require("../../models/PaymentMethod");

const validatePaymentMethodInput = require("../../validation/payment");

/* POST a payment method */
router.post('/add', passport.authenticate('jwt', {session: false}), (req, res) => {

    const { errors, isValid } = validatePaymentMethodInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
    stripe.paymentMethods.create({
        type: "card",
        card: {
            number: req.body.cardnumber,
            exp_month: req.body.expiredatemonth,
            exp_year: req.body.expiredateyear,
            cvc: req.body.cvvcode
        },
        billing_details: {
            name: req.body.holdername,
            address: {
                postal_code: req.body.zipcode
            }
        },
        }, function(err, token) {
            if (err) {
                return res.status(404).json({ message: "invalid card number" });
            }

           const new_payment = new PaymentMethod({
                cardnumber: req.body.cardnumber,
                token: token
            })

            const cardnumber = req.body.cardnumber
            
            function breakForOfLoop(arrayToBreak) {
                for (let elem of arrayToBreak) {

                  if (elem.cardnumber === cardnumber) {return false;}
                }
                return true
              }

            User.findById(req.user._id).then(user=>{
                if(user.payments.length===0) {
                    user.payments.push(new_payment)
                } else {
                    if(!breakForOfLoop(user.payments)) {
                        return res.status(404).json({ message: "card is exist!" });
                    } else {
                        user.payments.push(new_payment)
                    }
                }
            
               user
                .save()
                .then(user=> {
                    let data=[]
                    for (let payment of user.payments) {
                        let p={}
                        p._id = payment._id
                        p.cardnumber = payment.cardnumber.substr(payment.cardnumber.length-4)
                        p.cardtype = payment.token.card.brand
                        p.expdate = `${payment.token.card.exp_month}/${payment.token.card.exp_year}`
                        data.push(p)
                    }
                    res.json(data)
                })
                .catch(err=>console.log(err))
            })

            

        });
})

/* GET stores list */
router.get('/list', passport.authenticate('jwt', {session: false}), (req, res) => {

    User.findById(req.user._id).then(user=>{
        let data=[]
        for (let payment of user.payments) {
            let p={}
            p._id = payment._id
            p.cardnumber = payment.cardnumber.substr(payment.cardnumber.length-4)
            p.cardtype = payment.token.card.brand
            p.expdate = `${payment.token.card.exp_month}/${payment.token.card.exp_year}`
            data.push(p)
        }
        res.json(data)
    })

})


/* DETE a store by ID */
router.delete('/delete/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    User.findById(req.user._id).then(user=>{
        if(user.payments.id(req.params.id)) {
            user.payments.id(req.params.id).remove()
        } else {
            return res.status(404).json({ message: "cannot find card" }); 
        }
        
        user
            .save()
            .then(user=> {
                let data=[]
                for (let payment of user.payments) {
                    let p={}
                    p._id = payment._id
                    p.cardnumber = payment.cardnumber.substr(payment.cardnumber.length-4)
                    p.cardtype = payment.token.card.brand
                    p.expdate = `${payment.token.card.exp_month}/${payment.token.card.exp_year}`
                    data.push(p)
                }
                res.json(data)
            })
            .catch(err=>console.log(err))
    })
    
})

module.exports = router;