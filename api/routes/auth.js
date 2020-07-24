const express = require('express');
const auth = require('../controllers/auth.controller');

const router = express.Router();

// Create a new User
router.post('/login', auth.login);

module.exports = router;
