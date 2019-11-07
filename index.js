var express = require('express');
var app = express();
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');
var db = low(adapter);

db.defaults({users: [] })
  .write()

var port = 3000;

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
	,{users: db.get('users').value()});
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
		db.get('users').push(req.body).write();
		res.redirect('/users');
	});

app.listen(port);
