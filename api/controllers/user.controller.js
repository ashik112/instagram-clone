const moveFile = require('move-file');
const fs = require('fs');
const db = require('../models');

const User = db.users;
const { Op } = db.Sequelize;

// Create and Save a new User
exports.create = async (req, res) => {
  if (!req.body.username) {
    res.status(400).send({
      message: 'Username can not be empty!',
    });
    return;
  }
  const user = {
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    email: req.body.email,
  };
  try {
    const data = await User.create(user);
    const response = { ...data };
    delete response.dataValues.password;
    res.send(data);
  } catch (e) {
    res.status(500).send({
      error: 2,
      message:
        e.message || 'Some error occurred while creating the User.',
    });
  }
};

// Retrieve all Users/ find by username from the database
exports.findAll = async (req, res) => {
  const { username } = req.query;
  const condition = username ? { username: { [Op.like]: `%${username}%` } } : null;
  try {
    const data = await User.findAll({ where: condition });
    res.send(data);
  } catch (e) {
    res.status(500).send({
      error: e,
      message:
        e.message || 'Some error occurred while retrieving users.',
    });
  }
};

// Find a single User with an id
exports.createAvatar = async (req, res) => {
  const userID = req.body.user;
  const { filename } = req.file;
  const destination = `public/uploads/${filename}`;
  const source = `public/temp/${filename}`;
  // Validate request
  if (!userID) {
    res.status(400).send({
      message: 'User can not be empty!',
    });
    fs.unlinkSync(source);
    return;
  }

  let transaction;
  try {
    transaction = await db.sequelize.transaction();
    const data = await User.findByPk(userID);
    if (!data) {
      res.status(404).send({
        message: `Error retrieving User with id=${userID}`,
      });
      fs.unlinkSync(source);
      return;
    }

    const update = await User.update({ avatar: filename }, { where: { id: userID } });
    if (update[0] === 1) {
      await moveFile(source, destination);
      const updatedUser = await User.findByPk(userID);
      const { avatar } = data.dataValues;
      // remove previous avatar image
      if (avatar) {
        fs.unlink(`public/uploads/${avatar}`, () => {});
      }
      res.send(updatedUser);
    } else {
      fs.unlink(source, () => {});
      if (transaction) await transaction.rollback();
      res.status(404).send({
        message: `Some error occurred while updating user=${userID}`,
      });
    }
  } catch (e) {
    fs.unlinkSync(source);
    if (transaction) await transaction.rollback();
    res.status(500).send({
      message:
        e.message || 'Some error occurred while retrieving users.',
    });
  }
};

// Find a single User with an id
exports.findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await User.findByPk(id);
    if (!data) {
      res.status(404).send({
        message: `Error retrieving User with id=${id}`,
      });
      return;
    }
    res.send(data);
  } catch (e) {
    res.status(500).send({
      error: e,
      message: `Error retrieving User with id=${id}`,
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
