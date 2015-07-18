'use strict';

var express = require('express');
var passport = require('passport');
var authMiddleware = require('../../middlewares/auth');
var router = express.Router();

// invoked for any requested passed to this router
router.use(function(req, res, next) {
    next();
});

router.get('/', function(req, res, next) {
    res.json('Hello World!');
});

router.route('/write').
    post(authMiddleware.isAuthenticated, function(req, res, next) {
        res.json('Protected route');
    });

module.exports = router;
