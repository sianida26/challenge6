const carService = require('../services/CarService');

const validate = (fields, rules) => {
    const errors = [];
    const validatedFields = {};
    rules.forEach(rule => {
        if (!fields[rule]) errors.push(rule);
        validatedFields[rule] = fields[rule];
    })
    return {
        errors,
        validatedFields
    };
}

module.exports = {
    createCar: async (req, res) => {
        try {
            if (!req.auth?.user.role.includes('admin')) {
                return res.status(403).json({
                    message: 'You are not authorized to create a car',
                });
            }
            const validated = validate(req.body, ['plate','manufacture','model','price','capacity','description','transmission','type','year']);
            if (validated.errors.length > 0) {
                return res.status(422).json({
                    message: 'Missing fields',
                    errors: validated.errors.map(field => ({
                        field,
                        message: `${field} is required`,
                    })),
                });
            }
            await carService.createCar(validated.validatedFields, req.file.filename, req.auth.user);
            res.status(201).json({
                message: 'Car created',
            });
        }
        catch (e) {
            res.status(500).json({
                error: e.message || "Server error",
            })
            console.error(e)
        }
    },

    getAllCars : async (req, res) => {
        const cars = await carService.getAllCars();
        res.json(cars);
    },

    updateCar : async (req, res) => {
        try {
            if (!req.auth?.user.role.includes('admin')) {
                return res.status(403).json({
                    message: 'You are not authorized to modify a car',
                });
            }
            if (!req.body.id) {
                return res.status(400).json({
                    message: 'Id is required',
                });
            }
            const validated = validate(req.body, ['id', 'plate','manufacture','model','price','capacity','description','transmission','type','year']);
            const fileName = req.file ? req.file.filename : undefined;
            await carService.updateCar(validated.validatedFields, fileName, req.auth.user);
            res.status(200).json({
                message: 'Car updated',
            });
        }
        catch (e) {
            res.status(500).json({
                error: e.message || "Server error",
            })
            console.error(e)
        }
    },

    deleteCar : async (req, res) => {
        try {
            if (!req.auth?.user.role.includes('admin')) {
                return res.status(403).json({
                    message: 'You are not authorized to delete a car',
                });
            }
            if (!req.body.id) {
                return res.status(400).json({
                    message: 'Id is required',
                });
            }
            await carService.deleteCar(req.body.id, req.auth.user);
            res.status(200).json({
                message: 'Car deleted',
            });
        }
        catch (e) {
            res.status(500).json({
                error: e.message || "Server error",
            })
            console.error(e)
        }
    },
}