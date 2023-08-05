const UserModel = require('../models/user.model')

class UserRepository {
    async getProfile(user) {
        const data = await UserModel.query().select(
            'u.id',
            'u.email',
            'u.name',
        )
        .alias('u')
        .where({
            email: user.email
        })
        .first()

        return data
    }
}

module.exports = new UserRepository()