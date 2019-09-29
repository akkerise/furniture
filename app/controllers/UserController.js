'use strict';
const UserService = require('../../services').User;

const UserController = {

    async index(req, res) {
        let staticClient = ``;
        let {data} = await UserService.all();
        return res.render('pages/user/index', {data, staticClient});
    },

    async search(req, res) {

    },

    async add(req, res) {
        let user = req.body;
        res.json({user});
    },

    async show(req, res) {
        const {data, err} = await UserService.find(req.params.id);
        if (!err.success) return res.json({err});
        return res.json({err, data})
    },

    async update(req, res) {
        const {data, err} = await UserService.findUpdate(req);
        if (!err.success) return res.json({err});
        return res.json({err, data});
    },

    async del(req, res) {
        let {err, data} = await UserService.del(req);
        if (!err.success) return res.json({err});
        else return res.json({err, data});
    }

};

module.exports = UserController;
