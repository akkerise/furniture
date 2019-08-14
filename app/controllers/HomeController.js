'use strict'
var services = require('../../services')


const HomeController = {
    async index(req, res) {
        console.log(services.Auth.login());
        return res.render('pages/index');
    }
}

module.exports = HomeController;