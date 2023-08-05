class Authorization {
    auth(roles) {
        return (req, res, next) => {
            try {
                let decodeThisToken;
                decodeThisToken = this.getToken(req);
                req.user = decodeThisToken;

                if (!roles.includes(req.user.role)) {
                    const unauthorizedError = new Error('You are not authorized');
                    unauthorizedError.name = UNAUTHORIZED_ERR;
                    throw unauthorizedError;
                }

                return next();
            } catch (error) {
                const serverError = new Error(error);
                serverError.name = SERVER_ERR;
                throw serverError;
            }
        }
    }

    getToken(req) {
        const token = req.body.token || req.query.token || req.headers.authorization;

        if (!token) {
            const invalidError = new Error('A token is required for authentication');
            invalidError.name = INVALID_ERR;
            throw invalidError;
        }

        if (token.split(' ').length < 2) {
            const unauthorizedError = new Error('Wrong authentication token format');
            unauthorizedError.name = UNAUTHORIZED_ERR;
            throw unauthorizedError;
        }

        return this.decodeToken(token);
    }

    decodeToken(token) {
        const strToken = token.split(' ')[1];
        return jwt.verify(strToken, jwtSecret);
    }
}

module.exports = new Authorization();