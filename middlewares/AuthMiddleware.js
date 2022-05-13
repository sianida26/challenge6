const jwt = require('jsonwebtoken');

const { User } = require('../models');
const authConfig = require('../config/auth');

authMiddleware = async (req, res, next) => {
    try {

        const bearerToken = req.headers.authorization;
        const token = bearerToken.split('Bearer ')[1];
        const tokenPayload = jwt.verify(token, authConfig.jwtSecret, { algorithm: authConfig.jwtHashAlgorithm });
        req.auth = {
            token: token,
            user: (await User.findByPk(tokenPayload.id) || null),
        }
    }
    catch(_){
        // console.log(e);
    }
    finally {
        next();
    }
}

module.exports = authMiddleware;
