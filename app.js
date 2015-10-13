var express = require('express');
var webRouter = require('./web_router');
var config = require('./config');
var bodyParser = require('body-parser');
var app = express();

app.set("views","./views");
app.set("view engine","html");
app.engine('html',require('ejs').renderFile);


var path =require("path");
//static file
var staticDir = path.join(__dirname,"/public");

app.use(bodyParser.json({limit:'1mb'}));

app.use(bodyParser.urlencoded({extended:true,limit:'1mb'}));

app.use("/public",express.static(staticDir));

app.use('/',webRouter);

app.listen(config.port);

console.log("node server run on "+config.port);
