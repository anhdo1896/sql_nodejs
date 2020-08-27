var express = require('express');
var router = express.Router();
var product = require('./../controllers/product.controller')

router.get('/addItems',product.addItems)
module.exports=router