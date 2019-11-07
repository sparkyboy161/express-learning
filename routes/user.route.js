var express = require('express');
var shortid = require('shortid');

var router = express.Router();
var db = require('../db');

var users = db.get('users').value();

router.get('/',function(req,res){
	res.render('users/index'
	,{users: db.get('users').value()});
});

	router.get('/search',function(req,res){
		var name = req.query.name;
		var matchedUsers = users.filter(function(user){
			return user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1;
		});

		res.render('users/index'
		,	{
			users: matchedUsers
		});
	});

	router.get('/create',function(req,res){
		res.render('create.pug');
	});

	router.post('/create',function(req,res){
		req.body.id = shortid.generate();
		db.get('users').push(req.body).write();
		res.redirect('/users');
	});

	router.get('/:id',function(req,res){
		var id = req.params.id;

		var user = db.get('users').find({id:id}).value();

		res.render('users/view',{
			user: user
		});
	});

module.exports = router;
