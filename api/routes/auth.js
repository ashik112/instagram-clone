const express = require('express');
const auth = require('../controllers/auth.controller');

const router = express.Router();

// * Authorize User
router.post('/login', auth.login);

// * Register new User
router.post('/register', auth.register);

module.exports = router;
