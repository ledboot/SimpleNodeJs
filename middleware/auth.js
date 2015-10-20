var mongoose = require('mongoose');
var UserModel = mongoose.model('User');
var eventproxy = require('eventproxy');
var UserProxy = require('../proxy').User;
var config = require('../config');

function gen_session(user, res) {
	console.log('gen_session');
	var auth_token = user._id + '$$$$'; // 以后可能会存储更多信息，用 $$$$ 来分隔
	var opts = {
		path: '/',
		maxAge: 1000 * 60 * 60 * 24 * 30,
		signed: true,
		httpOnly: true
	};
	res.cookie(config.auth_cookie_name, auth_token, opts); //cookie 有效期30天
}

exports.gen_session = gen_session;

exports.authUser = function(req,res,next){
	console.log('authUser xxxxxxxxx');
	var ep = new eventproxy();
	ep.fail(next);

	res.locals.current_user = null;

	ep.all('get_user',function(user){
		if(!user){
			return next();
		}
		user = res.locals.current_user = req.session.user = new UserModel(user);
		//这里可以对user赋值是否是管理员
		next();
	});
	console.log('sssssss'+req.session+'xxx');

	if(req.session.user){
		ep.emit('get_user',req.session.user);
	}else{
		var auth_token = req.signedCookies[config.auth_cookie_name];
		console.log('bbbbbbbb xxxxxxxxx'+auth_token);
		if(!auth_token){
			console.log('aaaaa xxxxxxxxx'+auth_token);
			return next();
		}
		var auth = auth_token.split('$$$$');
		var user_id = auth[0];
		console.log('userId:'+user_id);
		UserProxy.getUserById(user_id,ep.done('get_user'));
	}
};

