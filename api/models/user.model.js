const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
  return  sequelize.define("user", {
    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate:{
        isEmail : true
      },
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
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
    defaultScope: {
      attributes: { exclude: ['password'] }
    },
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    },
    instanceMethods: {
      validPassword: function(password) {
        return bcrypt.compareSync(password, this.password);
      },
    }
  });
};
