'use strict'
var Services = require('../../services')


const HomeController = {
    async index(req, res) {
        return res.render('pages/index');
    },

    async search (req, res){
        return res.status(200).json(req.params);
    },
}

module.exports = HomeController;