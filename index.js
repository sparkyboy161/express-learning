var express = require('express');
var app = express();

var port = 3000;

app.set("view engine", "pug");

app.get('/',function(request,response){
	response.send('Hello World')
});

app.listen(port);