const express = require('express');
const router = express.Router();
const authController = require('../Controllers/AuthController');

router.post('/login', authController.loginUser);
router.get('/me', authController.getLoggedInUser);

module.exports = router;