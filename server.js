var express = require("express");
var app = express();
var mongoose = require("mongoose");
var morgan  =  require("morgan");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var fs = require('fs');


app.use(express.static(__dirname + '/app'));
/*
app.use('/bower_components',express.static(__dirname + '/bower_components'));
*/
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({"extended": "true"}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());



app.get("*",function(res,res) {
	res.sendfile("./app/index.html");
})





app.listen(process.env.PORT || 3000);
console.log("started");