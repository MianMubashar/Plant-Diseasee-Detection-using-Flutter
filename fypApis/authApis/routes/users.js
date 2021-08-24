var express = require('express');
const userControeller  = require('../controllers/user_controller')
var router = express.Router();

/* GET users listing. */
router.post('/user-login',userControeller.userLogin);
router.post('/user-register',userControeller.userRegistration);

module.exports = router;
