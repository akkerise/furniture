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
        //console.log(`URL: ${req.url}`);

       
    },

    async read(req, res) {
      
    },

    async update(req, res) {
     
    },

    async delete(req, res) {
       
    },

};

module.exports = RequestController;
