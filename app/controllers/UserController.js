'use strict';
const UserService = require('../../services').User;

const UserController = {

    async index(req, res) {
        let {data} = await UserService.all();
        return res.render('pages/user/index', {data});
    },

    async search(req, res) {

    },

    async add(req, res) {

    },

    async show(req, res) {
        const {data, err} = await UserService.find(req.params.id);
        return res.json({err, data})
    },

    async update(req, res) {
        const {data, err} = await UserService.findUpdate(req);
        return res.json({err, data});
    },

    async del(req, res) {
        let {err, data} = await UserService.del(req);
        return res.json({err, data});
    }

};

module.exports = UserController;
