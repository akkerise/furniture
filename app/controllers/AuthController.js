'use strict'
var services = require('../../services')

const AuthController = {
    async login(req, res){
        return res.json({message: 'Action: #login'});
    },

    async register(req, res){
        return res.json({message: 'Action: #register'});
    },
};

module.exports = AuthController;