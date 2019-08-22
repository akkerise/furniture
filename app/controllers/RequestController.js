'use strict'

var Services = require('../../services');
var models = require('../../models')

const RequestController = {

    async store(req, res) {
        let {err, request} = await Services.Request.store(req.body);
        if(!err.status) return res.json({err});
        return res.json({err, request});
    },

    async create(req, res) {
        let {err, request} = await Services.Request.create(req.body);
        if(!err.status) return res.json({err});
        return res.json({err, request});
    },

    async read(req, res) {
        let {err, request} = await Services.Request.read(req.body);
        if(!err.status) return res.json({err});
        return res.json({err, request});
    },

    async update(req, res) {
        let {err, request} = await Services.Request.update(req.body);
        if(!err.status) return res.json({err});
        return res.json({err, request});
    },

    async delete(req, res) {
        let {err, request} = await Services.Request.delete(req.body);
        if(!err.status) return res.json({err});
        return res.json({err, request});
    },

};

module.exports = RequestController;
