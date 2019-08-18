var models = require('../models');

module.exports = {
    async login(params) {

    },

    async register(params) {
        let {name, email, password} = params;
        if (!name || !email || !password) return {err: {message: 'Some field is invalid!'}}
        try {
            let user = await models.user.create(params);
            return {err: null, user};
        } catch (err) {
            return {err: err.toString()};
        }
    }
};

