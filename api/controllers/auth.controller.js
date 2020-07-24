const jwt = require('jsonwebtoken');
const db = require('../models');
const auth = require('../config/auth.config');

const { Op } = db.Sequelize;
const User = db.users;

// Log in User
exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send({
      message: 'Username and Password required!',
    });
    return;
  }
  const condition = {
    [Op.or]: [
      {
        username: {
          [Op.eq]: username,
        },
      },
      {
        email: {
          [Op.eq]: username,
        },
      },
    ],
  };
  try {
    const user = await User.unscoped().findOne({ where: condition });
    if (user && await user.validPassword(password)) {
      delete user.dataValues.password;
      const token = jwt.sign({
        userId: user.getDataValue('id'),
      }, auth.secret, {
        expiresIn: '24h', // expires in 24 hours
      });
      res.send({
        user: user.dataValues,
        token,
      });
    } else {
      res.status(403).send({
        message: 'Incorrect username/password',
      });
    }
  } catch (err) {
    res.status(500).send({
      error: err,
      message: err.message || 'Login failed!',
    });
  }
};
