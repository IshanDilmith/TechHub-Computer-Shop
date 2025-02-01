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

router.get('/allOrders', async (req, res) => {
    try {
        const orders = await order.find();
        res.status(200).send(orders);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Server Error", error: err.message });
    }
});

router.get('/order/:orderId', async (req, res) => {
    const orderId = req.params.orderId;

    try {
        const fetchOrder = await order.findById(orderId);

        if (!fetchOrder) {
            res.status(404).send({ message: "No order found" });
        } else {
            res.status(200).send(fetchOrder);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Server Error", error: err.message });
    }
});

router.get('/:userId', async (req, res) => {
    let userId = req.params.userId;

    try {
        const fetchOrder = await order.find({ userId: userId });

        if (!fetchOrder) {
            res.status(404).send({ message: "No orders found for this user" });
        } else {
            res.status(200).send(fetchOrder);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Server Error", error: err.message });
    }
});

module.exports = router;
