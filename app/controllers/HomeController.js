'use strict'
var Services = require('../../services')


const HomeController = {
    async index(req, res) {
        console.log(Services.User.login());
        return res.render('pages/index');
    },

    async search (req, res){
        return res.status(200).json(req.params);
    },
}

module.exports = HomeController;