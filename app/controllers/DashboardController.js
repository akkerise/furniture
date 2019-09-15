'use strict';
const Services = require('../../services');

const DashboardController = {

    async index(req, res) {
        return res.render('pages/dashboard/index');
    }

};

module.exports = DashboardController;
