const UserRepository = require('../repositories/user.repository')

class UserService {
    async getProfile(user) {
        return await UserRepository.getProfile(user)
    }
}

module.exports = new UserService()