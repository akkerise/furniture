'use strict'
var Services = require('../../services')


const HomeController = {
    async index(req, res) {
        console.log(Services.Auth.login());
        return res.render('pages/index');
    }
}

module.exports = HomeController;