'use strict'

var Services = require('../../services');
var models = require('../../models')

const RequestController = {

    async store(req, res) {
        let {err, request} = await Services.Request.store(req.body);
        if(!err.status) return res.json({err});
        return res.json({err, request});
    },

};

module.exports = RequestController;
