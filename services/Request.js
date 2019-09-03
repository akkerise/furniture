var models = require("../models");
import SR from '../utilities/helper/service-response'; // ServiceResponse

module.exports = {
    async store(params) {
        let {name, email, phone, content} = params;
        try {
            let [request, created] = await models.request.findOrCreate({
                where: {name, email, phone},
                defaults: {name, email, phone, content}
            });
            if (!created) return SR.failed(`Request is exist's`);
            else return SR.success(request.get({plain: true}),`Request create successfully!`);
        } catch (err) {
            return SR.failed(err);
        }
    }
};
