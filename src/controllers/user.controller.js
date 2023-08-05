const UserService = require('../services/user.service')
const SuccessResult = require('../utils/response.util')

class UserController {
    async getProfile(req, res) {
        const user = req.user

        const data = await UserService.getProfile(user)
        SuccessResult.make(res).sendWithHumps(data)
    }
}

module.exports = new UserController