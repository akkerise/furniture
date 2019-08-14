'use strict'

// var UserService = require('../../services/UserService');
// import UserService from '../services/UserService';
var Services = require('../../services');

const UserController = {

    async index(req, res) {
        if (req.params.id) {
            console.log(Services);
            let user = await Services.User.findId(req.params.id);
            if (user) return res.json({ user: user });
            return res.json({ message: `User not exist's` });
        } else res.json({ message: 'User id not found' });
    },

    async search(req, res) {
        let [attribute, value] = [req.params.attribute, req.params.value];
        let user = await UserService.findWhere({ attribute, value });
        return res.json({ user });
    },

};

module.exports = UserController;
