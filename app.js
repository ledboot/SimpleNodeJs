var express = require('express');
var webRouter = require('./web_router');
var config = require('./config');
var bodyParser = require('body-parser');
var app = express();
var path = require("path");
var auth = require('./middleware/auth');
var _ = require('lodash');

var assets ={};

app.set("views","./views");
app.set("view engine","html");
app.engine('html',require('ejs-mate'));
app.locals._layoutFile = 'layout.html';//母版页

var staticDir = path.join(__dirname,"/public");

//static file

app.use("/public",express.static(staticDir));
app.use('/',webRouter);

//middleware
app.use(bodyParser.json({limit:'1mb'}));
app.use(bodyParser.urlencoded({extended:true,limit:'1mb'}));
app.use(require('cookie-parser')(config.session_secret));




//custom middleware
app.use(auth.authUser);


app.listen(config.port);

console.log("node server run on "+config.port);
