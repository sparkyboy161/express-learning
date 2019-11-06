var express = require('express');
var app = express();

var port = 3000;
var	users = [
		{ id:1, name: 'Huy' },
		{	id:2,	name: 'Lam'	}
	];


app.set("view engine", "pug");

app.get('/',function(request,response){
	response.render('index',{
		myName: 'Huy'
	});
});

app.get('/users',function(request,response){
	response.render('users/index'
	,{users: users});
});

	app.get('/users/search',function(request,response){
		var q = request.query.q;
		var matchedUsers = users.filter(function(user){
			return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
		});

		response.render('users/index'
		,	{
			users: matchedUsers
		});
	});

app.listen(port);
