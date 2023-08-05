const router = require('express-promise-router')()
const AuthController = require('../controllers/auth.controller')
const ValidationMiddleware = require('../middlewares/validation.middleware')
const userValidationSchema = require('../validations/user.validation')

router.post(
    '/api/register',
    ValidationMiddleware.validate(
        userValidationSchema.create
    ),
    AuthController.register
)

router.post(
    '/api/login',
    ValidationMiddleware.validate(
        userValidationSchema.login
    ),
    AuthController.login
)

module.exports = router