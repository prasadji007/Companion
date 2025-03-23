const express = require('express');
const router = express.Router();
const authController = require('./controllers/authController.js');

router.post('/signup', authController.signup); // POST /auth/signup

module.exports = router;
