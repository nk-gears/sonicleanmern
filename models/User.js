const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

var storeShema = new Schema({ 
  address1: {
    type: String,
    required: true
  },
  address2: {
    type: String,
  },
  city: {
    type: String,
    require: true
  },
  us_state: {
    type: String,
    require: true
  },
  zipcode: {
    type: String,
    require: true
  }
});

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: false
  },
  companyName: {
    type: String,
    required: true
  },
  websiteURL: {
    type: String,
    required: true
  },
  mohawkAccount: {
    type: Number,
    required: true
  },
  mohawkBrand: {
    type: String,
    enum : ['Mohawk','Karastan', 'Mohawk & Karastan'],
    default: '',
    require: true
  },
  active: {
    type: Boolean,
    default: false,
  },
  stores: [storeShema]
});

module.exports = User = mongoose.model("users", UserSchema);
