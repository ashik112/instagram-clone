const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config.js');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
    logging: true,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./user.model')(sequelize, Sequelize);
db.likes = require('./like.model')(sequelize, Sequelize);
db.posts = require('./post.model')(sequelize, Sequelize);
db.comments = require('./comment.model')(sequelize, Sequelize);
db.follows = require('./follow.model')(sequelize, Sequelize);

db.users.hasMany(db.posts, {
  as: 'posts',
});

db.users.belongsToMany(db.users, {
  foreignKey: 'userId',
  as: 'followers',
  through: db.follows,
});
db.users.belongsToMany(db.users, {
  foreignKey: 'followerId',
  as: 'following',
  through: db.follows,
});

db.posts.belongsTo(db.users, {
  onDelete: 'CASCADE',
  foreignKey: { allowNull: false },
  hooks: true,
});
db.comments.belongsTo(db.users, {
  onDelete: 'CASCADE',
  foreignKey: { allowNull: false },
  hooks: true,
});
db.likes.belongsTo(db.users, {
  onDelete: 'CASCADE',
  foreignKey: { allowNull: false },
  hooks: true,
});

db.posts.hasMany(db.likes, {
  as: 'likes',
});
db.likes.belongsTo(db.posts, {
  onDelete: 'CASCADE',
  foreignKey: { allowNull: false },
  hooks: true,
});

db.posts.hasMany(db.comments, {
  as: 'comments',
});
db.comments.belongsTo(db.posts, {
  onDelete: 'CASCADE',
  foreignKey: { allowNull: false },
  hooks: true,
});

module.exports = db;
