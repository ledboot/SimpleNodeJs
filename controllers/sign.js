var eventproxy = require('eventproxy');
var User = require('../proxy').User;
var validator = require('validator');
var tools = require('../common/tools');
var mail = require('../common/mail');
var utility = require('utility');
var config = require('../config');

exports.showLogin =function(req,res){
	res.render('sign/signup');
};

/**注册**/
exports.signup =function(req,res,next){
	var email = validator.trim(req.body.email).toLowerCase();
	var account =validator.trim(req.body.account).toLowerCase();
	var pass =req.body.pass;
	var verifyPass = req.body.verifyPass;
	var ep = new eventproxy();
	ep.fail(next);
	ep.on('prop_err',function(msg){
		res.status(422);
		res.render('sign/signup',{error:msg,account:account,email:email});
	});

	if([email,account,pass,verifyPass].some(function(item){return item == '';})){
		return ep.emit('prop_err','Infomation is incomplete!');
	}

	if(!validator.isEmail(email)){
		return ep.emit('prop_err','Please input correct email!');
	}

	if(account.length<5){
		return ep.emit('prop_err','UserName at least 5 character!');
	}

	if(pass != verifyPass){
		return ep.emit('prop_err','Password is not same!');
	}

	User.getUsersByQuery({'$or':[{'loginname':account},{'email':email}]},{},function(err,users){
		if(err){
			return next(err);
		}
		if(users.length>0){
			return ep.emit('prop_err','UserName or Email already exist!');
		}
		tools.bhash(pass,ep.done(function(passhash){
			mail.sendActiveMail(email,utility.md5(email+passhash+config.session_secret),account);
			User.newAndSave(email,account,passhash,false,function(err){
				if(err){
					return next(err);
				}
				res.render('sign/signup',{success:'welcome to simpleNodeJs,we already sent a active email to you,please check your email:'+email});
			});
		}))
	});
};

/**账号激活**/
exports.activeAccount = function(req,res,next){
	var key = validator.trim(req.query.key);
	var name = validator.trim(req.query.name);
	User.getUserByLoginName(name,function(err,user){
		if(err){
			return next(err);
		}
		if(!user){
			return next(new Error('[ACTIVE_ACCOUNT] no such user:'+name));
		}
		var passhash = user.pass;
		if(!user || utility.md5(user.email+passhash+config.session_secret) != key){
			return res.render('notify/notify',{error:'信息有误，账号无法被激活。'});
		}
		if(user.active){
			return res.render('notify/notify',{error:'账号已经激活。'});
		}
		user.active = true;
		user.save(function(err){
			if(err){
				return next(err);
			}
			res.render('notify/notify',{success:'账号已经激活，请登陆。'});
		});
	});
}

exports.signin = function(req,res){
	res.render('sign/signin');
};