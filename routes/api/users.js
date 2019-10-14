const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const modemailer = require("nodemailer")
const crypto = require('crypto');

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateConfirmationInput = require("../../validation/confirmation")

// Load User model
const User = require("../../models/User");
const Token = require("../../models/Token")

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation

  let defaultPassword = 'test123'

  const { errors, isValid } = validateRegisterInput(req.body);
  
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
        phoneNumber: req.body.phoneNumber,
        companyName: req.body.companyName,
        websiteURL: req.body.websiteURL,
        mohawkAccount: req.body.mohawkAccount,
        mohawkBrand: req.body.mohawkBrand,
        roles: 'admin',
        stores: {
            name: req.body.companyName,
            phoneNumber: req.body.phoneNumber,
            address1: req.body.address1,
            address2: req.body.address2,
            city: req.body.city,
            us_state: req.body.us_state,
            zipcode: req.body.zipcode,
            active: false
        }
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
                  text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttps:\/\/' + 'soniclean.herokuapp.com' + '\/confirmation\/' + token.token + '.\n' 
                };
                transporter.sendMail(mailOptions, function (err) {
                    if (err) { 
                      return res.status(500).json({ message: err.message }); 
                    }
                    res.json({message: 'A verification email has been sent to ' + user.email + '.'});
                });
              })
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    if (!user.isVerified) return res.status(401).json({ message: "Your account has not been verified." }); 
    
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          email: user.email
        };
        
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ message: "Password incorrect" });
      }
    });
  });
});

router.post('/confirmation', (req, res) => {
  
  const { errors, isValid } = validateConfirmationInput(req.body);
  
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Token.findOne({ token: req.body.token }, function (err, token) {
    
      if (!token) return res.status(400).json({ message: 'We were unable to find a valid token. Your token my have expired.' });

      // If we found a token, find a matching user
      User.findOne({ _id: token._userId }, function (err, user) {
          if (!user) return res.status(400).json({ message: 'We were unable to find a user for this token.' });
          if (user.isVerified) return res.status(400).json({ message: 'This user has already been verified.' });

          // Verify, reset password and save the user
          user.isVerified = true;
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
              if (err) throw err;
              user.password = hash;
              user.save(function (err) {
                if (err) { return res.status(500).json({ message: err.message }); }
                res.status(200).json({
                  success: true,
                  message: "The account has been verified. Please log in."
                });
              });
            })
          })
      });
  });
})

router.post('/resend', (req, res) => {
    User.findOne({ email: req.body.email }, function (err, user) {
      if (!user) return res.status(400).send({ msg: 'We were unable to find a user with that email.' });
      if (user.isVerified) return res.status(400).send({ msg: 'This account has already been verified. Please log in.' });

      // Create a verification token, save it, and send email
      var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });

      // Save the token
      token.save(function (err) {
          if (err) { return res.status(500).send({ msg: err.message }); }

          // Send the email
          var transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD } });
          var mailOptions = { from: 'no-reply@codemoto.io', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' };
          transporter.sendMail(mailOptions, function (err) {
              if (err) { return res.status(500).send({ msg: err.message }); }
              res.json('A verification email has been sent to ' + user.email + '.');
          });
      });

  });
})

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.send(req.user)
})


module.exports = router;
