const express = require('express');
const multer = require('multer');
const path = require('path');
const helpers = require('../helpers');
const posts = require('../controllers/post.controller');

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/temp/');
  },
  // By default, multer removes file extensions so let's add them back
  filename(req, file, cb) {
    cb(null, `post-${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage, fileFilter: helpers.imageFilter }).single('photo');

router.post('/', upload, posts.create);

// Retrieve all Users
router.get('/', posts.findAll);

// Retrieve single Post
router.get('/:id', posts.findOne);

// Retrieve single Post
router.patch('/:id', posts.update);

// Retrieve single User
router.delete('/:id', posts.removeOne);

module.exports = router;
