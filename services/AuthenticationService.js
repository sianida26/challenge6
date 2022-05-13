// require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth');
const userRepository = require('../repositories/UserRepository');


const generateAccessToken = (user) => {

    return jwt.sign({
        id: user.id,
    }, 
    authConfig.jwtSecret, 
    {
        algorithm: authConfig.jwtHashAlgorithm,
    })
}  

module.exports = {

    login: async (username, password) => {
        const user = await userRepository.firstWhere({ username })
        if (user) {
            const isValid = await bcrypt.compare(password, user.password);
            if (isValid) {
                return {
                    user: {
                        username: user.username,
                        name: user.name,
                        role: user.role,
                    },
                    token: generateAccessToken(user),
                };
            }
        }
        throw new Error('Invalid username or password');
    },

    register: async (username, password, name, role) => {
        const user = await userRepository.firstWhere({ username });

        //Check if user exists
        if (user) {
            throw new Error('User already exists');
        }

        //Hash password
        const hashedPassword = await bcrypt.hash(password, authConfig.saltRounds);

        //Create user
        const newUser = await userRepository.create({
            username,
            password: hashedPassword,
            name,
            role,
        });

        return true
    },

    getUserFromToken: async (token) => {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userRepository.find(decodedToken.id);
        return user;
    },

}