var eventproxy = require('eventproxy');
var User = require('../proxy').User;
var validator = require('validator');
var tools = require('../common/tools');
var mail = require('../common/mail');
var utility = require('utility');
var config = require('../config');
var auth = require('../middleware/auth');

/**
 * define some page when login just jump to the home page
 * @type {Array}
 */
var notJump = [
  '/active_account', //active page
  '/reset_pass',     //reset password page, avoid to reset twice
  '/signup',         //regist page
  '/search_pass'    //serch pass page
];

/*跳转注册页面*/
exports.showLoginUp =function(req,res){
	res.render('sign/signup');
};

/*跳转登陆页面*/
exports.showLoginIn = function(req,res){
	res.render('sign/signin');
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

exports.login = function(req,res,next){
	console.log('login xxxxxxxxxxxxxxxx');
	/*var loginname = validator.trim(req.body.loginname).toLowerCase();
	var pass = validator.trim(req.body.pass);*/
	console.log('req：'+req.body);
	var loginname = req.body.loginname;
	var pass = validator.trim(req.body.pass);
	var ep = new eventproxy();
	ep.fail(next);
	if(!loginname || !pass){
		res.status(422);
		return res.render('sign/signin',{error:'信息不完整。'});
	}
	var getUser;


	if(namex.indexof('@') != -1){
		getuser = User.getUserByMail;
	}else{
		getUser =User.getUserByLoginName;
	}

	ep.on('login_error',function(login_error){
		res.status(403);
		res.render('sign/signin',{error:'用户名或密码错误'});
	});

	getUser(loginname,function(err,user){
		if(err){
			return next(err);
		}
		if(!user){
			return ep.emit('login_error');
		}
		var passhash = user.pass;
		tools.bcompare(pass,passhash,ep.done(function(bool){
			if(!bool){
				return ep.emit('login_error');
			}
			if(!user.active){
				mail.sendActiveMail(user.email,utility.md5(user.email+passhash+config.session_secret),user.loginname);
				res.status(403);
				return res.render('sign/signin',{ error: '此帐号还没有被激活，激活链接已发送到 ' + user.email + ' 邮箱，请查收。'});
			}
			auth.gen_session(user,res);
			console.log('gen_session');
			//这里可以记录用户在未登录之前，访问的地址，登陆之后调回那个页面
			res.redirect('/');
		}));

	});
};
