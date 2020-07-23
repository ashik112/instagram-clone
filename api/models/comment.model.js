// eslint-disable-next-line no-unused-vars
module.exports = (sequelize, Sequelize) => sequelize.define('comment', {
  userId: {
    type: Sequelize.INTEGER,
    unique: 'user_and_post',
  },
  postId: {
    type: Sequelize.INTEGER,
    unique: 'user_and_post',
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
