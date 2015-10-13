var nodemailer = require('nodemailer');
var config = require('../config');
var SITE_ROOT_URL = 'http://'+config.host+':'+config.port;
var transporter = nodemailer.createTransport(config.mail_opts);


var sendMail = function(data){
	transporter.sendMail(data,function(error,info){
		if(error){
			console.log('send mail error:');
			console.log(error.message);
			return;
		}
		console.log('send email successfully!');
	});
};

exports.sendMail = sendMail;


exports.sendActiveMail = function(who,token,name){
	var from	=	config.name + ' <'+config.mail_opts.auth.user+'>';
	var to 		=	who;
	var subject	=	config.name + 'Account active';
	var html	=	'<p>nihao dsa fdsa fds </p>'+
					'<a href ="'+SITE_ROOT_URL+'/active_account?key='+token+'&name='+name+'">Active</a>';
	exports.sendMail({
		from:from,
		to:to,
		subject:subject,
		html:html
	});
};