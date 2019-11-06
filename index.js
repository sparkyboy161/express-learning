var express = require('express');
var app = express();

var port = 3000;

app.set("view engine", "pug");

app.get('/',function(request,response){
	response.render('index',{
		myName: 'Huy'
	});
});

app.get('/users',function(request,response){
	response.render('users/index')
});

app.listen(port);