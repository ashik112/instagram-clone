const users = require("../controllers/user.controller.js");
const helpers = require("../helpers");
const express = require('express');
const multer  = require('multer');
const path = require('path');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/temp/');
  },

  // By default, multer removes file extensions so let's add them back
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('avatar');

/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/

// Create a new User
router.post("/", users.create);

// Retrieve all Users
router.get("/", users.findAll);

// Retrieve single User
router.get("/:id", users.findOne);


// Upload User avatar
router.post("/upload-avatar", upload, users.createAvatar)

module.exports = router;
