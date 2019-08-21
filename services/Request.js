var models = require('../models');

module.exports = {
    
    async store(params){
        let {name, email, phone} = params;
        return models.request.findOrCreate({where: {name, email, phone}, defaults: {name, email, phone}});
    },
    
}