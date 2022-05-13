/**
 * Abstract Repository Class 
 * 
 * @class Repository
 */
class Repository {

    model;
    
    constructor(model){
        if(this.consturctor == Repository) throw new Error("Abstract class cannot be instantiated directly");
        this.model = model;
    }

    async create(properties){
        return await this.model.create(properties); //Returns the created entity
    }
    
    async delete(id){
        await this.model.destroy(id);
        return true;
    }

    async find(id){
        return await this.model.findByPk(id)
    }

    async where(attributes){
        return await this.model.findAll({
            where: attributes
        });
    }

    async firstWhere(attributes){
        return await this.model.findOne({
            where: attributes
        });
    }

    async update(id, attributes){
        await this.model.update(attributes, {
            where: {
                id
            }
        });
        return true;
    }

    async all(){
        return await this.model.findAll();
    }

    async truncate(){
        return await this.model.destroy({
            truncate: true
        })
    }
}

module.exports = Repository;