'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var tesselV1 = require('./controllers/v1/tessel');
var app = express();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// port of the api server
var port = process.env.PORT || 3000;

// REGISTER OUR ROUTES
// =============================================================================
app.use('/v1/tessel', tesselV1);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
