const express = require('express');
const router = express.Router();
const { Customer, validateCustomer } = require('../models/customer');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
    const customers = await Customer.find();

    res.send(customers);
});

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send('Not found');

    res.send(customer);
});

router.post('/', auth, async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = new Customer({
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone,
    });
    if (!customer) return res.status(404).send('Not found');
    await customer.save();

    res.send(customer);
});

router.put('/:id', auth, async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send('Not found');

    customer.name = req.body.name;
    await customer.save();

    res.send(customer);
});

router.delete('/:id', auth, async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) return res.status(404).send('Not found');

    res.send(customer);
});

module.exports = router;