'use strict'

var Services = require('../../services');
var models = require('../../models')

const RequestController = {

    async store(req, res) {
        let [request, created] = await Services.Request.store(req.body);
        if(!created) return new Error(`Request is exist's`);
        let result = request.get({plain: true});
        return res.status(200).json({result});
    },

};

module.exports = RequestController;
