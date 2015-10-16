var models = require('../models');
var uuid = require('node-uuid');
var User = models.User;

exports.getUserById = function(id,callback){
	if(!id){
		return callback();
	}
	User.findOne({ _id:id },callback);
};

exports.getUserByMail = function(mail,callback){
	if(!mail){
		return callback();
	}
	User.findOne({ email:mail},callback);
};


exports.getUsersByQuery = function(query,opt,callback){
	User.find(query,'',opt,callback);
};

exports.getUserByLoginName = function(name,callback){
	if(name.length == 0){
		return callback(null,[]);
	}
	User.findOne({ loginname :name},callback);
};


exports.newAndSave = function(email,account,pass,active,callback){
	var user = new User();
	user.loginname = account;
	user.nickname = account;
	user.pass = pass;
	user.email = email;
	user.accessToken = uuid.v4();
	user.active = active || false;
	user.save(callback);
};