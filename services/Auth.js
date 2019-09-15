const SR = require('../utilities/helper/service-response');
const models = require("../models");

module.exports = {
    async login(req) {
        let {email, password} = req.body;
        if (!email || !password) return SR.failed(`Request missing email or password param!`);
        try {
            let {err, data} = await models.user.authenticate(email, password);
            if (!err.success) return SR.failed(err.message);
            req.session.user = data;
            return SR.success(`Login is successfully!`, data);
        } catch (e) {
            return SR.failed(e);
        }
    },
    async register(params) {
        let {name, email, password, phone} = params;
        if (!name || !email || !phone || !password) return SR.failed(`Some field is invalid!`);
        return models.user.create({name, email})
            .then(() => models.user.findOrCreate({where: {name, email, phone}}))
            .then(([user, created]) => {
                if (!created) return SR.failed(`Create user failed!`);
                return SR.success(`Create user successfully!`, user);
            })
            .catch(e => SR.failed(e));
    }
};
