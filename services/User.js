const models = require('../models');
const SR = require('../utilities/helper/service-response');

module.exports = {
    async login(params) {
        return SR.success(params)
    },

    async register(params) {
        let {name, email, password} = params;
        if (!name || !email || !password) return SR.failed(`Some field is invalid!`);
        try {
            let user = await models.user.create(params);
            return SR.success(user, `Create user successfully!`);
        } catch (e) {
            return SR.failed(e.toString());
        }
    }
};

