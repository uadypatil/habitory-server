// repositories/mongo/user.repository.mongo.js
const UserRepository = require('../user.repository');

class UserRepositoryMongo extends UserRepository {
  async create(user) {
    // mongoose logic
  }

  async findById(id) {
    // mongoose logic
  }
}

module.exports = UserRepositoryMongo;
