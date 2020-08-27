var express = require('express');
var router = express.Router();
var controllerUser = require('./../controllers/user.controller')

router.get('/listUser',controllerUser.listUser)
module.exports = router;