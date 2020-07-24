const express = require('express');
const multer = require('multer');
const path = require('path');
const helpers = require('../helpers');
const users = require('../controllers/user.controller');
const follows = require('../controllers/follow.controller');

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
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// *  Upload user avatar
const upload = multer({ storage, fileFilter: helpers.imageFilter }).single('avatar');

// * Create a new User
router.post('/', users.create);

// * Get all Users
router.get('/', users.findAll);

// * Get a single User
router.get('/:id', users.findOne);

// * Retrieve single User by username
router.get('/username/:username', users.findByUsername);

// * Delete a User
router.delete('/:id', users.delete);

// * Update single User
router.patch('/:id', users.update);

// * Change Password
router.patch('/:id/change-password', users.changePassword);

// * Upload User avatar
router.post('/upload-avatar', upload, users.createAvatar);

// * Follow another user
router.post('/follow', follows.follow);

// * Unfollow another user
router.post('/unfollow', follows.unfollow);

module.exports = router;
