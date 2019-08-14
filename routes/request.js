var express = require('express');
var router = express.Router();
var RequestController = require('../app/controllers/RequestController');

router.post('/create', RequestController.create);

module.exports = router;
