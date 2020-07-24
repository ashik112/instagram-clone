const express = require('express');
const multer = require('multer');
const path = require('path');
const helpers = require('../helpers');
const posts = require('../controllers/post.controller');
const likes = require('../controllers/like.controller');
const comments = require('../controllers/comment.controller');

const router = express.Router();

/**
 * Keep original file extension
 * @type {DiskStorage}
 */
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/temp/');
  },
  // By default, multer removes file extensions so let's add them back
  filename(req, file, cb) {
    cb(null, `post-${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// * Upload post photo
const upload = multer({ storage, fileFilter: helpers.imageFilter }).single('photo');

// * Create a post
router.post('/', upload, posts.create);

// * Get all posts
router.get('/', posts.findAll);

// * Get a single post
router.get('/:id', posts.findOne);

// * Update post
router.patch('/:id', posts.update);

// * Remove post
router.delete('/:id', posts.delete);

// * Add like on post
router.post('/:postId/like', likes.create);

// * Remove like on post
router.delete('/:postId/dislike', likes.delete);

// * Add a comment on post
router.post('/:postId/comment', comments.create);

module.exports = router;
