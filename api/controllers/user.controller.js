const moveFile = require('move-file');
const bcrypt = require('bcrypt');
const fs = require('fs');
const db = require('../models');

const User = db.users;
const Post = db.posts;
const Follow = db.follows;
const { Op } = db.Sequelize;

async function getStatistics(userId) {
  const statistics = {
    totalFollowers: 0,
    totalFollowings: 0,
    totalPosts: 0,
  };
  try {
    statistics.totalPosts = await Post.count({
      where: {
        userId,
      },
    });
  } catch (e) {
    // handle error
  }
  try {
    statistics.totalFollowings = await Follow.count({
      where: {
        followerId: userId,
      },
    });
  } catch (e) {
    // handle error
  }
  try {
    statistics.totalFollowers = await Follow.count({
      where: {
        userId,
      },
    });
  } catch (e) {
    // handle error
  }
  return statistics;
}

// * Create a new User
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
      error: e,
      message:
        e.message || 'Some error occurred while creating the User.',
    });
  }
};

// * Retrieve all Users/ find by name from the database
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

// * Save user avatar
exports.createAvatar = async (req, res) => {
  const { userId } = req.body;
  const { filename } = req.file;
  const destination = `public/uploads/${filename}`;
  const source = `public/temp/${filename}`;
  // Validate request
  if (!userId) {
    res.status(400).send({
      message: 'User can not be empty!',
    });
    fs.unlinkSync(source);
    return;
  }

  let transaction;
  try {
    transaction = await db.sequelize.transaction();
    const data = await User.findByPk(userId);
    if (!data) {
      res.status(404).send({
        message: `Error retrieving User with id=${userId}`,
      });
      // * remove temporary image
      fs.unlinkSync(source);
      return;
    }

    const update = await User.update({ avatar: filename }, { where: { id: userId } });
    if (update[0] === 1) {
      await moveFile(source, destination);
      const updatedUser = await User.findByPk(userId);
      const { avatar } = data.dataValues;
      if (avatar) {
        // * remove previous avatar image
        fs.unlink(`public/uploads/${avatar}`, () => {});
      }
      res.send(updatedUser);
    } else {
      // * remove temporary image
      fs.unlink(source, () => {});
      if (transaction) await transaction.rollback();
      res.status(404).send({
        message: `Some error occurred while updating user=${userId}`,
      });
    }
  } catch (e) {
    // * remove temporary image
    fs.unlinkSync(source);
    if (transaction) await transaction.rollback();
    res.status(500).send({
      message:
        e.message || 'Some error occurred while retrieving users.',
    });
  }
};

// * Find a single User with an id
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

// * Find a single User by username
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
    data.dataValues.statistics = await getStatistics(data.id);
    res.send(data);
  } catch (e) {
    res.status(500).send({
      error: e,
      message: `Error retrieving User with username=${username}`,
    });
  }
};

// * Update User
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
      error: e,
      message:
        e.message || `Some error occurred while updating the user=${id}`,
    });
  }
};

// * Change user password
exports.changePassword = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  try {
    const data = await User.update({
      password: bcrypt.hashSync(password, bcrypt.genSaltSync()),
    }, {
      where: { id },
    });
    if (data[0] > 0) {
      const user = await User.findByPk(id);
      res.send(user);
    }
  } catch (e) {
    res.status(500).send({
      error: e,
      message:
        e.message || 'Some error occurred while changing password',
    });
  }
};

// * Delete a User
exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await User.findByPk(id, {
      include: [{
        model: Post,
        as: 'posts',
      }],
    });
    if (await User.destroy({ where: { id } })) {
      // remove avatar from storage
      const avatar = data.getDataValue('avatar');
      if (avatar) {
        fs.unlink(`public/uploads/${avatar}`, () => {});
      }

      // remove post photos from storage
      const { posts } = data.dataValues;
      posts.forEach((item) => {
        const { photo } = item.dataValues;
        fs.unlink(`public/uploads/${photo}`, () => {});
      });

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
