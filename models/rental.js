const Joi = require('joi');
const mongoose = require("mongoose");

const rentalSchema = mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: { type: String, required: true },
            phone: { type: String, required: true }
        }), required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: { type: String, required: true },
            dailyRentalRate: { type: String, required: true },
            genre: {
                type: new mongoose.Schema({
                    name: { type: String, required: true },
                }), required: true
            }
        }), required: true
    },
    dateOut: { type: Date, required: true, default: Date.now },
    dateReturned: { type: Date },
    rentalFee: { type: Number, min: 0 }
});

const Rental = mongoose.model("Rental", rentalSchema);

function validateRental(rental) {
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required(),
        genreId: Joi.objectId().required(),
    }).unknown(true);

    return schema.validate(rental);
}

exports.validateRental = validateRental;
exports.Rental = Rental;