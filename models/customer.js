const Joi = require('joi');
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    isGold: { type: Boolean, default: false },
    name: { type: String, required: true },
    phone: { type: String, required: true },
});

const Customer = mongoose.model("Customer", customerSchema);

function validateCustomer(customer) {
    const schema = Joi.object({
        isGold: Joi.boolean(),
        name: Joi.string().required(),
        phone: Joi.string().required(),
    });

    return schema.validate(customer);
}

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;