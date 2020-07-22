const moveFile = require('move-file');
const fs = require('fs');
const db = require("../models");

const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.username) {
    res.status(400).send({
      message: "Username can not be empty!"
    });
    return;
  }
  // Create a User
  const user = {
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    email: req.body.email,
  };
  // Save User in the database
  User.create(user)
  .then(data => {
    delete data.dataValues.password
    res.send(data);
  })
  .catch(err => {
    console.log(err);
    res.status(500).send({
      error: err,
      message:
        err.message || "Some error occurred while creating the User."
    });
  });
};

// Retrieve all Users/ find by username from the database
exports.findAll = (req, res) => {
  const username = req.query.username;
  const condition = username ? { username: { [Op.like]: `%${username}%` } } : null;

  User.findAll({ where: condition })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving users."
    });
  });
};

// Find a single User with an id
exports.createAvatar = async (req, res) => {
  const userID = req.body.user;
  const filename = req.file.filename;
  const destination = `public/uploads/${filename}`;
  const source = `public/temp/${filename}`;
  // Validate request
  if (!userID) {
    res.status(400).send({
      message: "User can not be empty!",
    });
    fs.unlinkSync(source);
    return;
  }

  try {
    const data = await User.findByPk(userID);
    if(!data) {
      res.status(404).send({
        message: "Error retrieving User with id=" + userID,
      });
      fs.unlinkSync(source);
      return ;
    }

    const { avatar } = data.dataValues;
    await moveFile(source, destination);
    const update = await User.update({ avatar: filename }, { where: { id: userID } });

    if(update[0] >= 1) {
      const updatedUser = await User.findByPk(userID);
      if(avatar) fs.unlink(`public/uploads/${avatar}`, () => {});
      res.send(updatedUser);
    } else {
      fs.unlink(source, () => {});
      res.status(404).send({
        message: "Some error occurred while updating user=" + userID,
      });
    }

  } catch (e) {
    fs.unlinkSync(source);
    res.status(500).send({
      message:
        e.message || "Some error occurred while retrieving users."
    });
  }
};

// Find a single User with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await User.findByPk(id);
    if(!data) {
      res.status(404).send({
        message: "Error retrieving User with id=" + id,
      });
      return;
    }
    res.send(data);
  } catch (e) {
    res.status(500).send({
      error: e,
      message: "Error retrieving User with id=" + id,
    });
  }
};

// Update a User by the id in the request
exports.update = (req, res) => {

};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {

};
