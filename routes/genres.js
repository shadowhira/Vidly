const express = require('express');
const router = express.Router();
const { Genre, validateGenre } = require('../models/genre');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/', async (req, res) => {
    const genres = await Genre.find();

    res.send(genres);
});

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send('Not found');

    res.send(genre);
});

router.post('/', auth, async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = new Genre({ name: req.body.name });
    if (!genre) return res.status(404).send('Not found');
    await genre.save();

    res.send(genre);
});

router.put('/:id', auth, async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send('Not found');

    genre.name = req.body.name;
    await genre.save();

    res.send(genre);
});

router.delete('/:id', [auth, admin], async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndDelete(req.params.id);
    if (!genre) return res.status(404).send('Not found');

    res.send(genre);
});

module.exports = router;