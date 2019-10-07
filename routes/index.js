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
// router.get(`/error/:status`, function (req, res) {
//     if (req.params && req.params.status) {
//         return res.render(`pages/error/${req.params.status}`);
//     } else {
//         return res.render(`pages/error/500`);
//     }
// });

module.exports = router;
