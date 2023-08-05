const router = require('express-promise-router')()
const UserController = require('../controllers/user.controller')
const Authentication = require('../middlewares/authentication.middleware')

router.get(
    '/api/me',
    Authentication.auth,
    UserController.getProfile
)

module.exports = router