const express = require('express');
const router = express.Router();
const UserController = require('../app/controllers/UserController');
const {logged} = require('../app/middlewares/auth');

/* GET users listing. */
router.get('/', logged, UserController.index);

/* Services */
router.post('/service/add', logged, UserController.add);
router.post('/service/del/:id', logged, UserController.del);
router.get('/service/show/:id', logged, UserController.show);
router.post('/service/update', logged, UserController.update);

module.exports = router;
