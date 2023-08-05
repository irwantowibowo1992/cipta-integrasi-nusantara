const bcrypt = require('bcrypt')
const AuthRepository = require('../repositories/auth.repository')
const JwtToken = require('../utils/token.util')
const humps = require('humps')

class AuthService {
    async registerUser(data) {
        const checkUser = await AuthRepository.getUserByEmail(
            data.email
        )

        if (checkUser) {
            const error = new Error('Data is exists')
            error.statusCode = 422
            throw error
        }

        return await AuthRepository.register(data)
    }

    async login(data) {
        const checkUser = await AuthRepository.getUserByEmail(data.email)

        if (!checkUser) {
            const error = new Error('Email not exists')
            error.statusCode = 404
            throw error
        }

        // compare password
        const isMatch = await bcrypt.compare(data.password, checkUser.password)

        if (!isMatch) {
            const error = new Error('Email or password missmatch')
            error.statusCode = 401
            throw error
        }

        return await this.afterLogin(checkUser)
    }

    async afterLogin(user) {
        // create token
        const paramToken = {
            id: user.id,
            name: user.name,
            email: user.email,
        }

        const expiredIn = {
            duration: 1,
            shorthandUnit: 'd',
        }

        const token = JwtToken.setToken(paramToken, expiredIn)

        const dataLogin = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            token: token
        }

        return humps.camelizeKeys(dataLogin)
    }
}

module.exports = new AuthService()