const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../../models/User");

const validateAccountInput = require("../../validation/account");

/* GET account info */
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {

    User.findById(req.user._id).then(user=>{
        let data = {}
        data._id = user._id
        data.firstName = user.firstName
        data.lastName = user.lastName
        data.email = user.email
        data.phoneNumber = user.phoneNumber
        data.workPhoneNumber = user.workPhoneNumber
        data.extension = user.extension
        data.userPhoto = user.userPhoto
        data.roles = user.roles
        data.storesCount = user.stores.length

        res.json(data)
    })
})

/* PUT account info */
router.put('/update', passport.authenticate('jwt', {session: false}), (req, res) => {

    const { errors, isValid } = validateAccountInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

        User.findById(req.user._id).then(user=> {
            user.firstName = req.body.firstName,
            user.lastName = req.body.lastName,
            user.email = req.body.email,
            user.phoneNumber = req.body.phoneNumber,
            user.workPhoneNumber = req.body.workPhoneNumber,
            user.extension = req.body.extension,
            user
            .save()
            .then(user=> {
                let data = {}
                    data._id = user._id
                    data.firstName = user.firstName
                    data.lastName = user.lastName
                    data.email = user.email
                    data.phoneNumber = user.phoneNumber
                    data.workPhone = user.workPhone
                    data.extension = user.extension
                    data.workPhoneNumber = user.workPhoneNumber,
                    data.userPhoto = user.userPhoto
                res.json(data)
            })
            .catch(err=>console.log(err))
        })
})

module.exports = router;