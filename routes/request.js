var express = require('express');
var router = express.Router();
var RequestController = require('../app/controllers/RequestController');

router.get('/store', RequestController.store);
router.get('/create', RequestController.create);
router.get('/read/:id', RequestController.read);
router.get('/update/:id', RequestController.update);
router.delete('/delete/:id', RequestController.delete);

module.exports = router;
