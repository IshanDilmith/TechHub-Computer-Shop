const express = require('express');
const md5 = require('crypto-js/md5');
const { v4: uuidv4 } = require('uuid'); 
const router = express.Router();
require('dotenv').config();

const { MERCHANT_ID, MERCHANT_SECRET } = process.env;

function createHash(data) {
    const { merchantId, orderId, amount, currency, merchantSecret } = data;
    const hashedSecret = md5(merchantSecret).toString().toUpperCase();
    const amountFormatted = parseFloat(amount).toLocaleString('en-us', { minimumFractionDigits: 2 }).replaceAll(',', '');
    const hash = md5(merchantId + orderId + amountFormatted + currency + hashedSecret).toString().toUpperCase();
    return hash;
}

let paymentData;

router.post('/', (req, res) => {
    const { amount, firstName, lastName, email, phone, address, userId } = req.body;

    const orderId = uuidv4();

    const hashData = {
        merchantId: MERCHANT_ID,
        orderId,
        amount,
        currency: 'LKR',
        merchantSecret: MERCHANT_SECRET,
    };

    // Calculate hash
    const hash = createHash(hashData);

    paymentData = {
       ...hashData,
        return_url: 'http://localhost:5173/',
        cancel_url: 'http://localhost:5173/',
        notify_url: 'http://localhost:5173/',
        hash,
        firstName,
        lastName,
        email,
        phone,
        address,
        city: 'Colombo',
        country: 'Sri Lanka',
        userId
    };

    res.json(paymentData);
    console.log(`Payment Creation Data is ${JSON.stringify(paymentData)}`);
});

router.get('/success', (req, res) => {
    if(!paymentData) {
        return res.status(404).json({ message: 'No payment data found. Please create a payment first.' });
    }

    res.json(paymentData);
    
});

module.exports = router;