const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const OrdersSchema = new Schema({
    success_code: {type: Boolean, required: true},
    cust_ref: { type: String, required: true },
    order_number: {type: String, require: true},
    error_code: { type: String },
    message: { type: String },
    created: {type:Date, default:Date.now},
    createdBy: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = Orders = mongoose.model("orders", OrdersSchema);