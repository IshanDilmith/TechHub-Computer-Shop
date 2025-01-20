const express = require('express');
const router = express.Router();
const nodeMailer = require('nodemailer');
require('dotenv').config();

router.post('/', async (req, res) => {
    try {
        const transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        const mailOptions = {
            from: req.body.email,
            to: process.env.EMAIL,
            subject: `Message from ${req.body.email} \n${req.body.subject}`,
            text: req.body.message,
            replyTo: req.body.email

        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                res.status(500).send({ message: "Server Error", error: error.message });
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).send({ message: "Email sent successfully!" });
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Server Error", error: err.message });
    }
});

module.exports = router;