// eslint-disable-next-line no-unused-vars
module.exports = (sequelize, Sequelize) => sequelize.define('comment', {
  commentText: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});
