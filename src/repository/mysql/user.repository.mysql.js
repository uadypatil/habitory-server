// repositories/mysql/user.repository.mysql.js
const UserRepository = require('../user.repository');

class UserRepositoryMySQL extends UserRepository {
    async create(user) {
        // SQL query here
    }

    async findById(id) {
        // SQL query
    }
}

module.exports = UserRepositoryMySQL;
