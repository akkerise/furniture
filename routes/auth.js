var express = require('express');
var router = express.Router();
var AuthController = require('../app/controllers/AuthController');

/* GET users listing. */
router.get('/login', AuthController.login);

module.exports = router;
