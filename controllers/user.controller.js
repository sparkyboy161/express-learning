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
	req.body.id = shortid.generate();
	req.body.avatar = req.file.path.split('\\').slice(1).join('/');

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
