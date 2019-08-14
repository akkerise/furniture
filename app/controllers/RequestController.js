'use strict'

var Services = require('../../services');

const RequestController = {

    async create(req, res) {
        console.log(req.body);
        return await Services.Request.create(req.body);
    },

};

module.exports = RequestController;
