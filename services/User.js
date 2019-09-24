const models = require('../models');
const SR = require('../utilities/helper/service-response');

module.exports = {
    async all() {
        try{
            let data = await models.user.findAll({});
            return SR.success(`Get error data successfully!`, data);
        }catch(e) {
            SR.failed(e)
        }
    },
    async findWhere() {

    },
    async findId() {

    },
    async del(id){
        try{
            let data = await models.user.findByPk(id);
            return SR.success(`Deleted user id: ${id} successfully!`, data);
        }catch(e) {
            return SR.failed(`Delete user id ${id} failed!`);
        }
    }
};
