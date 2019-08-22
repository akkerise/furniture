var express = require('express');
var router = express.Router();
var UserController = require('../app/controllers/UserController');
var HomeController = require('../app/controllers/HomeController');

router.use("/cms", require(__dirname + "/cms"));
router.use("/user", require(__dirname + "/user"));
router.use("/auth", require(__dirname + "/auth"));
router.use("/request", require(__dirname + "/request"));


router.get('/', HomeController.index);
router.get('/:id', UserController.index);
router.get('/search/:keyword', HomeController.search)

module.exports = router;
