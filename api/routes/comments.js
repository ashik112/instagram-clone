const express = require('express');
const comments = require('../controllers/comment.controller');

const router = express.Router();

// * Remove a comment
router.delete('/:id', comments.delete);

module.exports = router;
