const UserRepository = require('../repositories/UserRepository');
const authService = require('../services/AuthenticationService');

module.exports = {
    createAdmin: async (req, res) => {
        try {
            const { username, password, name } = req.body;
            if (!username || !password || !name) {
                return res.status(400).json({
                    message: 'Username, password and name are required',
                });
            }

            if (!req.auth?.user?.role === 'superadmin') {
                return res.status(403).json({
                    message: 'You are not authorized to create an admin',
                });
            }

            await authService.register(username, password, name, 'admin');
            res.status(201).json({
                message: 'User created',
            })
        } catch (e) {
            res.status(500).json({
                error: e.message || "Server error",
            })
        }
    },

    getAllUsers: async (req, res) => {
        return res.json(
            await UserRepository.all()
        )
    },

    login: async (req, res) => {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({
                message: 'Username and password are required',
            });
        }

        try {
            const user = await authService.login(username, password);
            res.json(user);
        } catch (e) {
            res.status(500).json({
                error: e.message || "Server error",
                stackTrace: process.env.NODE_ENV === 'development' ? e.stack : undefined,
            });
        }
    },

    register: async (req, res) => {
        try {
            const { username, password, name } = req.body;
            if (!username || !password || !name) {
                return res.status(400).json({
                    message: 'Username, password and name are required',
                });
            }

            await authService.register(username, password, name);
            res.status(201).json({
                message: 'User created',
            })            
        } catch (e) {
            res.status(500).json({
                error: e.message || "Server error",
            });
        }
    },

    whoAmI: async (req, res) => {
        const user = req.auth?.user;
        res.json({
            username: user.username,
            name: user.name,
            role: user.role,
        });
    }
}