const express = require('express');
const router = express.Router();
const {logged} = require('../app/middlewares/auth');
const AuthController = require('../app/controllers/AuthController');

/* auth router listing. */
router.get('/login', AuthController.login);
router.post('/login', AuthController.postLogin);
router.get('/register', AuthController.register);
router.post('/register', AuthController.postRegister);
router.get('/profile', logged, AuthController.profile);
router.get('/logout', AuthController.logout);

module.exports = router;
