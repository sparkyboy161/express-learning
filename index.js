var express = require('express');

var userRoute = require('./routes/user.route');

var express = require('express');
var cookieParser = require('cookie-parser');

var app = express();

var port = 3000;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

app.set("view engine", "pug");

app.get('/',function(req,res){
	res.render('index',{
		myName: 'Huy'
	});
});

app.use('/users', userRoute);

app.listen(port);
