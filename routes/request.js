var express = require('express');
var router = express.Router();
var RequestController = require('../app/controllers/RequestController');

router.post('/store', RequestController.store);
router.post('/create', RequestController.create);
router.post('/read', RequestController.read);
router.post('/update', RequestController.update);
router.post('/delete', RequestController.delete);

module.exports = router;
