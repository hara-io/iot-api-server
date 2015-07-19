'use strict';

var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');
var ambient = require('./controllers/ambient');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// setup morgan for console logger
app.use(logger('dev'));

// use the passport package in our application
app.use(passport.initialize());

// port of the api server
var port = process.env.PORT || 3000;

// REGISTER OUR ROUTES
// =============================================================================
app.use('/tessel/ambient', ambient);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

// ERROR HANDLERS
// =============================================================================
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development/test error handler
// will print stacktrace
if (app.get('env') === 'development' || app.get('env') === 'test') {
    app.use(
        function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
