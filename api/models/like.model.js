// eslint-disable-next-line no-unused-vars
module.exports = (sequelize, Sequelize) => sequelize.define('like', {
  userId: {
    type: Sequelize.INTEGER,
    unique: 'user_and_post',
  },
  postId: {
    type: Sequelize.INTEGER,
    unique: 'user_and_post',
  },
});
