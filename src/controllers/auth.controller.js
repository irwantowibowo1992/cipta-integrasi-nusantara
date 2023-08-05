const AuthService = require('../services/auth.service')
const SuccessResult = require('../utils/response.util')

class AuthController {
    async register(req, res) {
        const body = req.body

        await AuthService.registerUser(body)
        SuccessResult.make(res).sendMessage('Register successfully')
    }

    async login(req, res) {
        const body = req.body

        const data = await AuthService.login(body)
        SuccessResult.make(res).sendWithHumps(data)
    }
}

module.exports = new AuthController()