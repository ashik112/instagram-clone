// eslint-disable-next-line no-unused-vars
module.exports = (sequelize, Sequelize) => sequelize.define('comment', {
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
