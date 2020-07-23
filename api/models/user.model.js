const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  avatar: {
    type: Sequelize.STRING,
    allowNull: true,
  },
}, {
  indexes: [
    { unique: true, fields: ['username'] },
    { unique: true, fields: ['email'] },
  ],
  defaultScope: {
    attributes: { exclude: ['password'] },
  },
  hooks: {
    beforeCreate: (user) => {
      const salt = bcrypt.genSaltSync();
      // eslint-disable-next-line no-param-reassign
      user.password = bcrypt.hashSync(user.password, salt);
    },
  },
  instanceMethods: {
    validPassword(password) {
      return bcrypt.compareSync(password, this.password);
    },
  },
});
