var express = require('express');
var app = express();

app.set("views","./views");
app.set("view engine","jade");


var path =require("path");
//static file
var staticDir = path.join(__dirname,"public");


app.use("/public",express.static(staticDir));



app.get("/",function(req,res){
	res.render("index",{
		title:"hello nodejs!"
	});
});

app.listen(8080);