var models = require('../models');

module.exports = {
    async create(params){
        return await models.request.create(params);
    },
}