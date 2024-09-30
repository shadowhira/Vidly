const Joi = require('joi');
const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
    name: { type: String, required: true },
});

const Genre = mongoose.model("Genre", genreSchema);

function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().required()
    });

    return schema.validate(genre);
}

module.exports.Genre = Genre;
module.exports.genreSchema = genreSchema;
module.exports.validate = validateGenre;