const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orders = new Schema({
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    deliveryAddess: {
        type: String,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    products: [{
        itemName: {
            type: String,
            required: true
        },
        itemQuantity: {
            type: Number,
            required: true
        }
    }],
    comments : {
        type: String,
        required: false
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'Pending',
        required: true
    }
});

module.exports = mongoose.model('Order', orders);