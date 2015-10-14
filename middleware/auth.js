var eventproxy = require('eventproxy');
var 

exports.authUser = function(req,res,next){
	var ep = new eventproxy();
	ep.fail(next);

	res.locals.current_user = null;

	ep.all('get_user',function(user){

	});

	if(req.session.user){
		ep.emit('get_user',req.session.user);
	}else{

	}
};