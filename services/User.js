const User = require('../models').user;
const SR = require('../utilities/helper/service-response');

module.exports = {
    async all() {
        try {
            let data = await User.findAll({});
            return SR.success(`Get data successfully!`, data);
        } catch (e) {
            SR.failed(e)
        }
    },

    async findWhere() {

    },

    async findUpdate(req) {
        const {id, name, email, phone} = req.body;
        try{
            let {err, data} = await this.find(id);
            if(!err.success) return SR.failed({err});
            let user = await data.update({name, email, phone});
            return SR.success(`Update information email: ${email} successfully!`, user);
        }catch (e) {
            return SR.failed(e.toString());
        }
    },

    async find(id) {
        try {
            let data = await User.findByPk(id);
            return SR.success(`Get data successfully!`, data);
        } catch (e) {
            return SR.failed(e.toString());
        }
    },

    async del(req) {
        if (!req.params || !req.params.id) return SR.failed(`Id user is invalid ${req.params.toString()}`);
        try {
            let {id} = req.params;
            let data = await User.findByPk(id);
            return SR.success(`Deleted user id: ${id} successfully!`, data);
        } catch (e) {
            return SR.failed(`Delete user id ${id} failed!`);
        }
    }
};
