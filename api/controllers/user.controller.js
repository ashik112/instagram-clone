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

// Retrieve all Users/ find by name from the database
exports.findAll = async (req, res) => {
  const { name } = req.query;
  const condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
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

// Find a single User with an id
exports.findByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const data = await User.findOne({
      where: {
        username,
      },
    });
    if (!data) {
      res.status(404).send({
        message: `Error retrieving User with username=${username}`,
      });
      return;
    }
    res.send(data);
  } catch (e) {
    res.status(500).send({
      error: e,
      message: `Error retrieving User with username=${username}`,
    });
  }
};

// Update a User by the id in the request
exports.update = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await User.update({
      description: req.body.description,
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
    }, {
      where: { id },
    });
    if (data[0] > 0) {
      const user = await User.findByPk(id);
      res.send(user);
    }
  } catch (e) {
    res.status(500).send({
      error: 2,
      message:
        e.message || `Some error occurred while updating the post=${id}`,
    });
  }
};

// Delete a User with the specified id in the request
exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await User.findByPk(id);
    if (await User.destroy({ where: { id } })) {
      const avatar = data.getDataValue('avatar');
      if (avatar) {
        fs.unlink(`public/uploads/${avatar}`, () => {});
      }
      res.status(204).send({
        message: 'Deleted Successfully',
      });
    } else {
      res.status(404).send({
        message:
          `No row found for user=${id}`,
      });
    }
  } catch (e) {
    res.status(500).send({
      error: e,
      message:
        e.message || `Some error occurred while deleting user=${id}`,
    });
  }
};
