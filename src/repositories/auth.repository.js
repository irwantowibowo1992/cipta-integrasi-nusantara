const UserModel = require('../models/user.model')

class AuthRepository {
    async getUserByEmail(email) {
        const data = await UserModel.query().select(
            'u.id',
            'u.email',
            'u.name',
            'u.password'
        )
        .alias('u')
        .where({
            email: email
        })
        .first()

        return data
    }

    async register(data) {
        return UserModel.query()
        .insert({
            name: data.name,
            email: data.email,
            password: data.password
        })
    }
}

module.exports = new AuthRepository()