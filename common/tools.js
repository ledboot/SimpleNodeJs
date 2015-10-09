var moment = require('moment');

moment.locale('zh-cn');

exports.formatDate = function(date,firendly){
	date = moment(date);
	if(friendly){
		return date.fromNow();
	}else{
		return date.format('YYYY-MM-DD HH:mm');
	}
};