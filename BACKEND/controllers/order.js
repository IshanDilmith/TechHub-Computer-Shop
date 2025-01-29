const order = require('../models/orders');
const router = require('express').Router();

router.post('/', async (req, res) => {
    try {
        const newOrder = new order({
            userId: req.body.userId,
            userName: req.body.userName,
            email: req.body.email,
            phone: req.body.phone,
            deliveryAddress: req.body.deliveryAddress,
            comments: req.body.comments,
            products: req.body.products,
            totalPrice: req.body.total,
        });
        const savedOrder = await newOrder.save();
        res.status(200).send(savedOrder);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Server Error", error: err.message });
    }
});

module.exports = router;
