var express = require('express');
var app = express();

var port = 3000;
var	users = [
		{ id:1, name: 'Huy' },
		{	id:2,	name: 'Lam'	}
	];

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.set("view engine", "pug");

app.get('/',function(req,res){
	res.render('index',{
		myName: 'Huy'
	});
});

app.get('/users',function(req,res){
	res.render('users/index'
	,{users: users});
});

	app.get('/users/search',function(req,res){
		var name = req.query.name;
		var matchedUsers = users.filter(function(user){
			return user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1;
		});

		res.render('users/index'
		,	{
			users: matchedUsers
		});
	});

	app.get('/users/create',function(req,res){
		res.render('create.pug');
	});

	app.post('/users/create',function(req,res){
		users.push(req.body);
		res.redirect('/users');
	});

app.listen(port);
