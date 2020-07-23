module.exports = (sequelize, Sequelize) => sequelize.define('post', {
  photo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});
