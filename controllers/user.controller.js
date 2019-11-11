var db = require('../db');
var shortid = require('shortid');

var users = db.get('users').value();

module.exports.index = function(req,res){
	res.render('users/index'
	,{users: db.get('users').value()});
};

module.exports.search = function(req,res){
  var name = req.query.name;
  var matchedUsers = users.filter(function(user){
    return user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1;
  });

  res.render('users/index'
  ,	{
    users: matchedUsers
  });
};

module.exports.create = function(req,res){
  res.render('create.pug');
};

module.exports.postCreate = function(req,res){
	var errors = [];
	var values = [];
	req.body.id = shortid.generate();

	if(!req.body.name){
		errors.push('Name is required');
	}

	if(!req.body.phone){
		errors.push('Phone is required');
	}

	if(errors.length){
		res.render("create.pug",{
			errors: errors,
			values: req.body
		});
		return;
	}

  db.get('users').push(req.body).write();
  res.redirect('/users');
}

module.exports.view = function(req,res){
  var id = req.params.id;

  var user = db.get('users').find({id:id}).value();

  res.render('users/view',{
    user: user
  });
};
