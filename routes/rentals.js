const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Customer } = require('../models/customer');
const { Rental, validateRental } = require('../models/rental');
const { Movie } = require('../models/movie');
const { Genre } = require('../models/genre');
const Fawn = require('fawn');
const auth = require('../middleware/auth');

// Fawn.init(mongoose);

// Get all
router.get('/', async (req, res) => {
    const rentals = await Rental.find();

    res.send(rentals);
});

// Get one
router.get('/:id', async (req, res) => {
    const rental = await Rental.findById(req.params.id);
    if (!rental) return res.status(404).send('Not found');

    res.send(rental);
});

// Post
router.post('/', auth, async (req, res) => {
    const { error } = validateRental(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid customerId.');

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Invalid movieId.');

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genreId.');

    if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');

    const rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate,
            genre: {
                _id: genre._id,
                name: genre.name,
            }
        },
    });
    await rental.save();

    movie.numberInStock --;
    movie.save()

    res.send(rental);

    // try {
    //     new Fawn.Task()
    //         .save('rentals', rental)
    //         .save('movies', { _id: movie._id } , {
    //             $inc: { numberInStock: -1 }
    //         })
    //         .run();
    
    //     res.send(rental);
    //     console.log(rental);
    // } catch (ex) {
    //     res.status(500).send('Something failed.');
    // }
});

module.exports = router;