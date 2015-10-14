var express = require('express');
var app = require('express');
var site = require('./controllers/site');
var sign =require('./controllers/sign');


var router = express.Router();


router.get('/',site.index);
router.get('/signup',sign.showLogin);
router.post('/signup',sign.signup);
router.get('/active_account',sign.activeAccount);
router.get('/signin',sign.signin);


module.exports = router;