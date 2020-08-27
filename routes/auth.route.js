var express = require('express');
var router = express.Router();
var auth = require('./../controllers/auth.controller')
//var validate = require('./../validate/user.validate')
// router.get('/login',auth.login)
// router.post('/login',validate.loginPost,auth.loginPost)
router.get('/register',auth.register)
router.post('/register',auth.registerCreate)
module.exports = router;
