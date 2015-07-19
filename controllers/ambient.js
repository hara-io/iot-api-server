'use strict';

var express = require('express');
var passport = require('passport');
var validator = require('validator');
var authMiddleware = require('../middlewares/auth');
var Ambient = require('../models').Ambient;
var router = express.Router();

// invoked for any requested passed to this router
router.use(function(req, res, next) {
    next();
});

// POST http://localhost:3000/tessel/ambient/invoke
router.route('/ambient/invoke').
    post(authMiddleware.isAuthenticated, function(req, res, next) {
        // get type and value from request body
        var ambientType = validator.trim(req.body.type);
        var ambientValue = validator.trim(req.body.value);
        var ambientDate = validator.trim(req.body.date);

        // if type OR value are not valid return error
        if (!validator.isFloat(ambientValue) ||
            !validator.isAlpha(ambientType) ||
            !validator.isLength(ambientType, 1, 1) ||
            !validator.isDate(ambientDate)) {
            res.json('error');
        }

        // create the ambient model and save it into db
        Ambient.build({
            type: ambientType,
            value: ambientValue,
            createdAt: ambientDate
        })
        .save()
        .then(function(record) {
            res.json(record);
        })
        .catch(function(err) {
            res.render('error', {
                message: err.name,
                error: err
            });
        });
    });

module.exports = router;
