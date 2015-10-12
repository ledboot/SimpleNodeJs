var moment = require('moment');
var bcrypt = require('bcrypt');
moment.locale('zh-cn');

exports.formatDate = function(date,firendly){
	date = moment(date);
	if(friendly){
		return date.fromNow();
	}else{
		return date.format('YYYY-MM-DD HH:mm');
	}
};

exports.bhash = function(str,callback){
	bcrypt.hash(str,10,callback);
};