var express = require('express');
var app = require('express');
var site = require('./controllers/site');
var sign =require('./controllers/sign');


var router = express.Router();


router.get('/',site.index);//首页
router.get('/signup',sign.showLoginUp);//注册页面
router.get('/signin',sign.showLoginIn);//登陆页面
router.post('/signup',sign.signup);//注册
router.get('/active_account',sign.activeAccount);//账号激活
router.post('/signin',sign.login);//登陆


module.exports = router;