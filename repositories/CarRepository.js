const Repository = require('./Repository');

const { Car } = require('../models');

/**
 * Car Repository Class
 * 
 * @class CarRepository
 * @extends {Repository}
 */
class CarRepository extends Repository {

    constructor(){
        super(Car);
    }
    
    async all(withTrashed = false){
        const result = withTrashed ? await super.all() 
            : (await super.all()).filter(car => !car.deletedAt);
        return result.map(car => {
            return {
                ...car,
                image: `/images/${car.image}`,
            }
        });
    }

    async where(attributes, withTrashed = false){
        return withTrashed ? await super.where(attributes) 
            : (await super.where(attributes)).filter(car => !car.deletedAt);
    }

    async firstWhere(attributes, withTrashed = false){
        return withTrashed ? await super.firstWhere(attributes) 
            : (await super.firstWhere(attributes)).filter(car => !car.deletedAt);
    }

    async find(id, withTrashed = false){
        const car = await super.find(id);
        if(!car) return null;
        if(!withTrashed && car.deletedAt) return null;
        return car;
    }

    async create(properties, user){
        properties.createdBy = user.id;
        properties.updatedBy = user.id;
        return await super.create(properties);
    }

    async update(id, properties, user){
        properties.updatedBy = user.id;
        //check if image is changed
        const car = await this.find(id);
        if (!properties.image) properties.image = car.image;
        return await super.update(id, properties);
    }

    async delete(id, user){
        return await super.update(id, {
            deletedBy: user.id,
            deletedAt: new Date(),
        });
    }
}

module.exports = new CarRepository();
