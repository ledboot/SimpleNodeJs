var models = require('../models');
var User = models.User;

exports.newAndSave = function(email,userName,pass,callback){
	var user = new User();
	user.name = userName;
	user.pass = pass;
	user.email = email;
	user.save(callback);
};