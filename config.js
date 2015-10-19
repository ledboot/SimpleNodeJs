var path = require('path');

var config = {
	debug:true,
  
	name:'SimpleNodeJs',

  // cdn host
  site_static_host:'',// 静态文件存储域名

	description: '', // 网站的描述
  keywords: 'nodejs,',

  	// mongodb 配置
  	db: 'mongodb://127.0.0.1/simple_nodejs',

  	// 程序运行的端口
  	port: 8080,

  	host:'localhost',

  	mail_opts:{
  		service:'126',
  		auth:{
  			user:'popmusicbbq@126.com',
  			pass:'wengaowei100;.'
  		}
  	},

    auth_cookie_name:'simple_nodejs',
    session_secret:'simple_nodejs_secret',
};

module.exports = config;
