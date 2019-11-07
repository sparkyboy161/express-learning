var express = require('express');
var app = express();
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');
var db = low(adapter);
var shortid = require('shortid');

db.defaults({users: [] })
  .write()

var port = 3000;
var users = db.get('users').value();

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
		req.body.id = shortid.generate();
		db.get('users').push(req.body).write();
		res.redirect('/users');
	});

	app.get('/users/:id',function(req,res){
		var id = req.params.id;

		var user = db.get('users').find({id:id}).value();

		res.render('users/view',{
			user: user
		});
	});

app.listen(port);
