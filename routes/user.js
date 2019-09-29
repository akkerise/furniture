const express = require('express');
const router = express.Router();
const UserController = require('../app/controllers/UserController');
const auth = require('../app/middlewares/auth');

/* GET users listing. */
router.get('/', auth.logged, UserController.index);

/* Services */
router.post('/service/add', auth.logged, UserController.add);
router.post('/service/del/:id', auth.logged, UserController.del);
router.get('/service/show/:id', auth.logged, UserController.show);
router.post('/service/update', auth.logged, UserController.update);

module.exports = router;
