var express = require('express');
var router = express.Router();
var AuthController = require('../app/controllers/AuthController');
var auth = require('../app/middlewares/auth');

/* GET users listing. */
router.get('/login', AuthController.login);
router.post('/login', AuthController.postLogin);
router.get('/register', AuthController.register);
router.post('/register', AuthController.postRegister);
router.get('/profile', auth.logged, AuthController.profile);
router.get('/logout', AuthController.logout);

module.exports = router;
