const express = require('express');
const router = express.Router();
const UserController = require('../app/controllers/UserController');
const auth = require('../app/middlewares/auth');

/* GET users listing. */
router.get('/', auth.logged, UserController.index);


/* Services */
router.post('/service/del/:id', auth.logged, UserController.del);

module.exports = router;
