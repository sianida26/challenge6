const Repository = require('./Repository');

const { User } = require('../models');

/**
 * User Repository Class
 * 
 * @class UserRepository
 * @extends {Repository}
 */
class UserRepository extends Repository {

    constructor(){
        super(User);
    }

    async create(properties, role = "member"){
        properties.role = properties.role ? properties.role : role;
        return await super.create(properties);
    }


}

module.exports = new UserRepository();
