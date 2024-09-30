const Joi = require('joi');
const mongoose = require("mongoose");
const { genreSchema } = require('../models/genre');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    numberInStock: { type: Number, required: true },
    dailyRentalRate: { type: Number, required: true },
    genre: { type: genreSchema, required: true }
})

const Movie = mongoose.model("Movie", movieSchema);

function validateMovie(movie) {
    const schema = Joi.object({
        title: Joi.string().required(),
        numberInStock: Joi.number().required(),
        dailyRentalRate: Joi.number().required(),
        genreId: Joi.objectId().required()
    }).unknown(true);

    return schema.validate(movie);
}

module.exports.validateMovie = validateMovie;
module.exports.Movie = Movie;