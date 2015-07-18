'use strict';

var express = require('express');
var router = express.Router();

// invoked for any requested passed to this router
router.use(function(req, res, next) {
    console.log('Some logic here... like any other middleware');
    next();
});

router.get('/', function(req, res, next) {
    res.json('Hello World!');
});

module.exports = router;
