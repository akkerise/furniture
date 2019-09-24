'use strict';
const Services = require('../../services');
const SR = require('../../utilities/helper/service-response');

const UserController = {

    async index(req, res) {
        let staticClient = '';
        let {data, err} = await Services.User.all();
        return res.render('pages/user/index', {data, staticClient});
    },

    async search(req, res) {

    },

    async add(req, res){
        let user = req.body;
        
    },
    
    async del(req, res) {
        // if(!req.params || !req.params.id) {
        // }
        let {data, err} = await Services.User.del(req.params.id);
        if(!err.success) return res.json({err});
        else return res.json({err, data});
    }

};

module.exports = UserController;
