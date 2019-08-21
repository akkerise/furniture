var models = require('../models');

module.exports = {

    async store(params) {
        let {name, email, phone, content} = params;
        try {
            let [request, created] = await models.request.findOrCreate({
                where: {name, email, phone},
                defaults: {name, email, phone, content}
            });
            if (!created) return {err: {status: created, message: `Request is exist's`}};
            return {
                err: {status: created, message: `Request create successfully!`},
                request: request.get({plain: true})
            };
        } catch (err) {
            return {err: {status: false, message: `Something error!`}};
        }

    },

}