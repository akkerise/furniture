var express = require('express');
var router = express.Router();
var RequestController = require('../app/controllers/RequestController');

router.post('/store', RequestController.store);

module.exports = router;
