const router = require('express').Router();
const {User, validate } = require('../models/user');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
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

        await new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword
        }).save();
        res.status(200).send({ message: "User Registered Successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Server Error", error: err.message });
    }
});

module.exports = router;
