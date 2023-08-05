const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET_KEY;

class Authentication {
    constructor(user) {
        this.user = user;
    }

    auth(req, res, next) {
        const token = req.header('Authorization');

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        try {
            const decoded = jwt.verify(token.split(' ')[1], jwtSecret);
            req.user = decoded;
            next();
        } catch (err) {
            const error = new Error('Token is not valid')
            error.statusCode = 401
            throw error
        }
    }

    getToken(req) {
        const token = req.body.token || req.query.token || req.headers.authorization;

        if (!token) {
            throw new InvalidData('A token is required for authentication');
        }

        if (token.split(' ').length < 2) {
            throw new UnauthorizedException('Wrong authentication token format.');
        }

        return this.decodeToken(token);
    }

    decodeToken(token) {
        const strToken = token.split(' ')[1];
        return jwt.verify(strToken, jwtSecret);
    }
}

module.exports = new Authentication();
