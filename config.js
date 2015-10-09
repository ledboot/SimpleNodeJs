var path = require('path');

var config = {
	debug:true,
	name:'SimpleNodeJs',
	description: '', // 网站的描述
  	keywords: 'nodejs,',

  	// mongodb 配置
  	db: 'mongodb://127.0.0.1/simple_nodejs',

  	// 程序运行的端口
  	port: 8080,
};

module.exports = config;
