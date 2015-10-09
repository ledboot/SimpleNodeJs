var tools = require('../common/tools');

module.exports = function(schema){
	schema.methods.create_at_ago = function(){
		return tools.fromatDate(this.create_at,true);
	};
	schema.methods.update_at_ago = function(){
		return tools.fromatDate(this.update_at,true);
	};
};