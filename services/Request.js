var models = require('../models');

module.exports = {

    async store(params) {
        let { name, email, phone, content } = params;
        try {
            let [request, created] = await models.request.findOrCreate({
                where: { name, email, phone },
                defaults: { name, email, phone, content }
            });
            if (!created) return { err: { status: created, message: `Request is exist's` } };
            return {
                err: { status: created, message: `Request create successfully!` },
                request: request.get({ plain: true })
            };
        } catch (err) {
            return { err: { status: false, message: `Something error!` } };
        }

    },

    //create -- CURD
    async create(params) {
        let { name, email, phone, content, jobId, jobOther, deletedAt } = params;
        try {
            let [request, created] = await models.request.findOrCreate({
                where: { name, email, phone, content, jobId, jobOther, deletedAt },
                defaults: { name, email, phone, content, jobId, jobOther, deletedAt }
            });
            if (!created) return { err: { status: created, message: `Request is exist's` } };
            return {
                err: { status: created, message: `Request create successfully!` },
                request: request.get({ plain: true })
            };
        } catch (err) {
            return { err: { status: false, message: `Something error!` } };
        }

    },

    //read -- CURD
    async read(params) {
        let { name, email, phone, content, jobId, jobOther, deletedAt } = params;
        try {
            let [request, created] = await models.request.findOrCreate({
                where: { name, email, phone, content, jobId, jobOther, deletedAt },
                defaults: { name, email, phone, content, jobId, jobOther, deletedAt }
            });
            if (!created) return { err: { status: created, message: `Request is exist's` } };
            return {
                err: { status: created, message: `Request read successfully!` },
                request: request.get({ plain: true })
            };
        } catch (err) {
            return { err: { status: false, message: `Something error!` } };
        }

    },

    //update -- CURD
    async update(params) {
        let { name, email, phone, content, jobId, jobOther, deletedAt } = params;
        try {
            let [request, created] = await models.request.findOrCreate({
                where: { name, email, phone, content, jobId, jobOther, deletedAt },
                defaults: { name, email, phone, content, jobId, jobOther, deletedAt }
            });
            if (!created) return { err: { status: created, message: `Request is exist's` } };
            return {
                err: { status: created, message: `Request update successfully!` },
                request: request.get({ plain: true })
            };
        } catch (err) {
            return { err: { status: false, message: `Something error!` } };
        }

    },

    //delete -- CURD
    async delete(params) {
        let { name, email, phone, content, jobId, jobOther, deletedAt } = params;
        try {
            let [request, created] = await models.request.removeFromCollection({
                where: { name, email, phone, content, jobId, jobOther, deletedAt },
                defaults: { name, email, phone, content, jobId, jobOther, deletedAt }
            });
            if (!created) return { err: { status: created, message: `Request is exist's` } };
            return {
                err: { status: created, message: `Request delete successfully!` },
                request: request.get({ plain: true })
            };
        } catch (err) {
            return { err: { status: false, message: `Something error!` } };
        }

    },

}