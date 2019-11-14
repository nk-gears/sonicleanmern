const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const modemailer = require("nodemailer")
const crypto = require('crypto');

// Load input validation
const validateEmployeeInput = require("../../validation/employee")
const Token = require("../../models/Token")

// Load User model
const User = require("../../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/new/:id", passport.authenticate('jwt', {session: false}), (req, res) => {
    // Form validation
  
    let defaultPassword = 'test123'
  
    const { errors, isValid } = validateEmployeeInput(req.body);
    
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ message: "Email already exists" });
      } else {
        const newUser = new User({
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          companyName: req.body.companyName,
          mohawkAccount: req.body.mohawkAccount,
          mohawkBrand: req.body.mohawkBrand,
          roles: 'employee',
          _adminId: req.params.id
        });
  
        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(defaultPassword, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                var newToken = new Token({ 
                  _userId: user._id, 
                  token: crypto.randomBytes(16).toString('hex') 
                });
  
                newToken
                .save()
                .then(token=> {
                  var transporter = modemailer.createTransport({ 
                      service: 'gmail', 
                      auth: { 
                        user: 'wonder.dev21@gmail.com', 
                        pass: 'aksrudeo101668' 
                      } });
                  var mailOptions = {
                    from: 'wonder.dev21@gmail.com',
                    to: user.email,
                    subject: 'Account Verification Token',
                    text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' 
                  };
                  transporter.sendMail(mailOptions, function (err) {
                      if (err) { 
                        return res.status(500).json({ message: err.message }); 
                      }
                    //   res.json({message: 'A verification email has been sent to ' + user.email + '.'});
                    User.find({_adminId: req.params.id})
                        .then(employees=> {
                            res.json(employees)
                    })
                  });
                })
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  });

router.get('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
//   res.send(req.user)
    User.find({_adminId: req.params.id})
        .then(employees=> {
            res.json(employees)
    })
})

router.delete('/delete/:id/:dealer', passport.authenticate('jwt', {session: false}), (req, res) => {

    User.findByIdAndRemove(req.params.id).then(user=>{
        if(user) {
            User.find({_adminId: req.params.dealer})
            .then(employees=> {
                res.json(employees)
            })
        } else {
            return res.status(400).json({message: 'Cannot find the employee.'})
        }
    })
})

module.exports = router;
