const express = require('express');
const router = express.Router();
const UserController = require('../app/controllers/UserController');
const HomeController = require('../app/controllers/HomeController');

router.use("/cms", require(__dirname + "/cms"));
router.use("/user", require(__dirname + "/user"));
router.use("/auth", require(__dirname + "/auth"));
router.use("/request", require(__dirname + "/request"));
router.use("/dash", require(__dirname + "/dash"));
router.get('/', HomeController.index);

module.exports = router;
