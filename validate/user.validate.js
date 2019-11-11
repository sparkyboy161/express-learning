module.exports.validate = function(req,res,next){
  var errors = [];
	var values = [];

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

  next();
}
