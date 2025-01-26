const order = require('../models/orders');
const router = require('express').Router();

router.post('/', async (req, res) => {
    try {
        const newOrder = new order({
            userId: req.body.userId,
            products: req.body.products,
            total: req.body.total,
        });
        const savedOrder = await newOrder.save();
        res.status(200).send(savedOrder);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Server Error", error: err.message });
    }
});

module.exports = router;
