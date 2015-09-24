var express = require('express');
var webRouter = require('./web_router');
var config = require('./config');
var app = express();

app.set("views","./views");
app.set("view engine","jade");


var path =require("path");
//static file
var staticDir = path.join(__dirname,"public");

//app.use(app.router);

app.use("/public",express.static(staticDir));

app.use('/',webRouter);

app.listen(config.port);