const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const schemaUser = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 3 },
    isAdmin: Boolean
});

schemaUser.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, 'jwtPrivateKey');
    return token;
}

const User = mongoose.model('User', schemaUser);

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(3),
    });

    return schema.validate(user);
}

exports.schemaUser = schemaUser;
exports.User = User;
exports.validateUser = validateUser;