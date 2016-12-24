// requires
var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var articulo=require("./models/articulos");
var path=require("path");
var formidable = require('express-formidable');
 

// rutas
var routes = require('./routes/index');
var users = require('./routes/users');
var articulos=require('./routes/articulos');


var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use(formidable.parse({
	uploadDir: 'images/',
	keepExtensions : true
}));

app.set('view engine', 'jade');

// middlewares

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// uso de rutas
app.use('/', routes);
app.use('/users', users);
app.use('/articulos',articulos);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
		app.use(function(err, req, res, next) {
				res.status(err.status || 500);
				res.render('error', {
						message: err.message,
						error: err
				});
		});
}




// production error handler
app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
				message: err.message,
				error: {}
		});
});

app.listen(process.env.PORT || 8080);
module.exports = app;
