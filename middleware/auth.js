var mongoose = require('mongoose');
var UserModel = mongoose.model('User');
var eventproxy = require('eventproxy');
var UserProxy = require('../proxy').User

exports.authUser = function(req,res,next){
	var ep = new eventproxy();
	ep.fail(next);

	res.locals.current_user = null;

	ep.all('get_user',function(user){
		if(!user){
			return next();
		}
		user = res.locals.current_user = req.session.user = new UserModel(user);
		//这里可以对user赋值是否是管理员


	});

	if(req.session.user){
		ep.emit('get_user',req.session.user);
	}else{
		var auth_token = req.signCookies[config.auth_cookie_name];
		if(!auth_token){
			return next();
		}
		var auth = auth_token.split('$$$$');
		var user_id = auth[0];
		UserProxy.getUserById(user_id,ep.done('get_user'));
	}
};

exports.gen_session =function(user, res) {
  var auth_token = user._id + '$$$$'; // 以后可能会存储更多信息，用 $$$$ 来分隔
  var opts = {
    path: '/',
    maxAge: 1000 * 60 * 60 * 24 * 30,
    signed: true,
    httpOnly: true
  };
  res.cookie(config.auth_cookie_name, auth_token, opts); //cookie 有效期30天
};