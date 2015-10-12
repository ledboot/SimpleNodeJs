var models = require('../models');
var uuid = require('node-uuid');
var User = models.User;


exports.getUsersByQuery = function(query,opt,callback){
	User.find(query,'',opt,callback);
};


exports.newAndSave = function(email,userName,pass,callback){
	var user = new User();
	user.nick_name = userName;
	user.pass = pass;
	user.email = email;
	user.accessToken = uuid.v4();
	user.save(callback);
};