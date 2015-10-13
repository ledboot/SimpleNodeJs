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
	var email = req.body.email;
	var userName =req.body.userName;
	var pass =req.body.pass;
	var verifyPass = req.body.verifyPass;
	var ep = new eventproxy();
	ep.fail(next);
	ep.on('prop_err',function(msg){
		res.status(422);
		res.render('sign/signup',{error:msg,userName:userName,email:email});
	});

	if([email,userName,pass,verifyPass].some(function(item){return item == '';})){
		return ep.emit('prop_err','Infomation is incomplete!');
	}

	if(!validator.isEmail(email)){
		return ep.emit('prop_err','Please input correct email!');
	}

	if(userName.length<5){
		return ep.emit('prop_err','UserName at least 5 character!');
	}

	if(pass != verifyPass){
		return ep.emit('prop_err','Password is not same!');
	}

	User.getUsersByQuery({'$or':[{'nick_name':userName},{'email':email}]},{},function(err,users){
		if(err){
			return next(err);
		}
		if(users.length>0){
			return ep.emit('prop_err','UserName or Email already exist!');
		}
		tools.bhash(pass,ep.done(function(passhash){
			mail.sendActiveMail(email,utility.md5(email+passhash+config.session_secret),userName);
			User.newAndSave(email,userName,passhash,function(err){
				if(err){
					return next(err);
				}
				res.render('sign/signup',{success:'welcome to simpleNodeJs,we already sent a active email to you,please check your email:'+email});
			});
		}))
	});
};