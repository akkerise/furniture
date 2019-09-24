'use strict';
const AuthService = require('../../services').Auth;
const Flash = require('../../utilities/helper/flash');

const AuthController = {
    async login(req, res) {
        return res.render('pages/auth/login', {messages: req.flash('messages')});
    },

    async postLogin(req, res) {
        let {err, data} = await AuthService.login(req);
        Flash.set(err);
        req.flash('messages', Flash.message);
        if (!err.success) return res.redirect('/auth/login');
        return res.redirect('/dash');
    },

    async register(req, res) {
        return res.render('pages/auth/register', {messages: req.flash('messages')});
    },

    async postRegister(req, res) {
        let {err, user} = await AuthService.register(req.body);
        Flash.set(err);
        req.flash('messages', Flash.message);
        if (err.success) return res.redirect('/auth/register');
        if (user) return res.redirect('/auth/login');
    },

    async profile(req, res) {
        return res.json({message: 'Action: #profile'})
    },

    async logout(req, res, next) {
        if (req.session) {
            req.session.destroy(function (err) {
                if (err) return next(err);
                else {
                    // Flash.set({message: `Logout user successfully!`, success: true});
                    // req.flash('message', Flash.message);
                    return res.redirect('/auth/login');
                }
            });
        } else return res.redirect('/');
    }
};

module.exports = AuthController;
