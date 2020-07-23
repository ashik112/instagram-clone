const moveFile = require('move-file');
const fs = require('fs');
const db = require('../models');

const User = db.users;
const Post = db.posts;

// Create a new post
exports.create = async (req, res) => {
  // Validate Request
  if (!req.body.userId) {
    res.status(400).send({
      message: 'userId can not be empty!',
    });
    return;
  }

  const { filename } = req.file;
  const destination = `public/uploads/${filename}`;
  const source = `public/temp/${filename}`;
  try {
    // move image from temp to uploads
    await moveFile(source, destination);
    const data = await Post.create({
      description: req.body.description,
      userId: req.body.userId,
      photo: destination,
    });
    res.send(data);
  } catch (e) {
    // remove image from temp
    fs.unlink(source, () => {});
    // remove image from uploads if it's already moved
    fs.unlink(destination, () => {});
    res.status(500).send({
      error: 2,
      message:
        e.message || 'Some error occurred while creating the Post.',
    });
  }
};

// Update a post
exports.update = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Post.update({
      description: req.body.description,
    }, {
      where: { id },
    });
    if (data[0] > 0) {
      const post = await Post.findByPk(id);
      res.send(post);
    }
  } catch (e) {
    res.status(500).send({
      error: 2,
      message:
        e.message || `Some error occurred while updating the post=${id}`,
    });
  }
};

// Get all Posts
exports.findAll = async (req, res) => {
  try {
    const data = await Post.findAll();
    res.send(data);
  } catch (e) {
    res.status(500).send({
      error: e,
      message:
        e.message || 'Some error occurred while retrieving posts.',
    });
  }
};

// Get a Post
exports.findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Post.findOne({
      where: {
        id,
      },
      include: [{
        model: User,
      }],
    });
    if (!data) {
      res.status(404).send({
        message: `Error retrieving Post with id=${id}`,
      });
      return;
    }
    res.send(data);
  } catch (e) {
    res.status(500).send({
      error: e,
      message:
        e.message || `Some error occurred while retrieving post=${id}`,
    });
  }
};

// Delete a post
exports.removeOne = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Post.destroy({ where: { id } });
    if (data) {
      res.status(200).send({
        message: 'Deleted Successfully',
      });
    } else {
      res.status(404).send({
        message:
          `No row found for post=${id}`,
      });
    }
  } catch (e) {
    res.status(500).send({
      error: e,
      message:
        e.message || `Some error occurred while deleting post=${id}`,
    });
  }
};
