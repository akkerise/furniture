'use strict'
var Services = require('../../services')

const AuthController = {
    async login(req, res) {
        return res.render('pages/auth/login', {messages: req.flash('messages')});
    },

    async postLogin(req, res) {

    },

    async register(req, res) {
        return res.render('pages/auth/register', {messages: req.flash('messages')});
    },

    async postRegister(req, res) {
        let {err, user} = await Services.User.register(req.body);
        if (err) {
            req.flash('messages', {code: 'danger', msg: 'Something wrong!'});
            return res.redirect('/auth/register');
        }
        if (!user) {
            req.flash('messages', {code: 'danger', msg: 'Create user failed!'});
            return res.redirect('/auth/register');
        }
        if (!err && user) {
            req.flash('messages', {code: 'success', msg: 'Created user successfully!'});
            return res.redirect('/auth/login');
        }
    },

    async profile(req, res) {
        return res.json({message: 'Action: #profile'})
    },

    async logout(req, res, next) {
        if (req.session) {
            req.session.destroy(function (err) {
                if (err) return next(err);
                else return res.redirect('/');
            });
        }
    }
};

module.exports = AuthController;
