const carRepository = require('../repositories/CarRepository');

module.exports = {
    getAllCars: async () => {
        return await carRepository.all();
    },

    createCar: async (fields, filename, user) => {
        await carRepository.create({
            ...fields,
            image: filename,
        },
        user);
    },

    deleteCar: async (id, user) => {
        await carRepository.delete(id, user);
    },

    updateCar: async (fields, filename, user) => {
        await carRepository.update(fields.id, {
            ...fields,
            image: filename,
        },
        user);
    },
}