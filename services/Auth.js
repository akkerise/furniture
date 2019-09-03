var models = require('../models');

module.exports = {
    async login(params) {
        let {email, password} = params;
        if (!email || !password) return {err: {status: false, message: `Request missing email or password param`}};
        try {
            let user = await models.user.authenticate(email, password);
            user = await user.authorize();
            return {err: {status: true, message: `Login is successfully`}};
        } catch (err) {
            console.log(err.toString());
            return {err: {status: false, message: `invalid username or password`}};
        }

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

