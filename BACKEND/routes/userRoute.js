const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../controllers/userProfile');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/Profile', authMiddleware, getUserProfile);

module.exports = router;