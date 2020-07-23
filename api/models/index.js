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

db.users = require('./user.model.js')(sequelize, Sequelize);
db.likes = require('./like.model.js')(sequelize, Sequelize);
db.posts = require('./post.model.js')(sequelize, Sequelize);
db.comments = require('./comment.model.js')(sequelize, Sequelize);

db.users.hasMany(db.comments, {
  foreignKey: 'commentedBy',
  allowNull: false,
});
db.users.hasMany(db.posts, {
  foreignKey: 'posedBy',
  allowNull: false,
});
db.users.hasMany(db.likes, {
  foreignKey: 'likedBy',
  allowNull: false,
});

db.posts.belongsTo(db.users);
db.likes.belongsTo(db.posts);
db.comments.belongsTo(db.posts);

module.exports = db;
