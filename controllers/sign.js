var eventproxy = require('eventproxy');
var User = require('../proxy').User;

exports.showLogin =function(req,res){
	res.render('sign/signup');
};

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

	if(pass != verifyPass){
		return ep.emit('prop_err','password is not same!');
	}
};