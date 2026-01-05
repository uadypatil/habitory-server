// config/db.factory.js
let UserRepository;

if (process.env.DB_TYPE === 'mysql') {
  UserRepository = require('../repositories/mysql/user.repository.mysql');
} else {
  UserRepository = require('../repositories/mongo/user.repository.mongo');
}

module.exports = new UserRepository();
