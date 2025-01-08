const router = require('express').Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');
const {User, validate }= require('../models/user');
const CookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
require('dotenv').config();
app.use(CookieParser());

router.post('/register', async (req, res) => {
    try {
        const { error } = validate(req.body);

        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        const existingUser  = await User.findOne({ email: req.body.email });

        if ( existingUser ) {
            return res.status(409).send({ message:'User with given email is already registered' });
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword
        });

        await newUser.save();
        generateAuthToken(newUser, res);

    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Server Error", error: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { error } = logvalidate(req.body);

        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(401).send({ message: 'Invalid email or password' });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if (!validPassword) {
            return res.status(401).send({ message: 'Invalid email or password' });
        }

        generateAuthToken(user, res);
        

    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Server Error", error: err.message });
    }
});

const logvalidate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(255).required()
    });

    return schema.validate(data);
}

const generateAuthToken = (user, res) => {
    
    const token = jwt.sign(
        {
            id: user._id,
            role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
    );

    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
       .json({ 
           user : user,
           token : token,
       });

       
};


module.exports = router;
