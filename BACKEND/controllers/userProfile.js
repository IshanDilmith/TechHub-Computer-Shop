const User = require('../models/user');
require('dotenv').config();

exports.getUserProfile =  async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).send({ message: 'Unauthorized access' });
        }

        const userProfile = {
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            email: user.email
        };

        res.status(200).json(userProfile);

    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Server Error", error: err.message });
    }
};