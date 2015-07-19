'use strict';

var express = require('express');
var passport = require('passport');
var validator = require('validator');
var inputHelper = require('../helpers/validateInput');
var authMiddleware = require('../middlewares/auth');
var Ambient = require('../models').Ambient;
var router = express.Router();

// invoked for any requested passed to this router
router.use(function(req, res, next) {
    next();
});

// POST http://localhost:3000/tessel/ambient/invoke
// Authorization: Basic dGVzc2VsOnRlc3NlbDEyMw==
router.route('/invoke')
    .post(authMiddleware.isAuthenticated, function(req, res, next) {
        // get type and value from request body
        var ambientType = validator.trim(req.body.type);
        var ambientValue = validator.trim(req.body.value);
        var ambientDate = validator.trim(req.body.date);

        // if type OR value are not valid return error
        if (!inputHelper.validateAll(ambientType, ambientValue, ambientDate)) {
            rea.json('error');
        }

        // create the ambient model and save it into db
        Ambient.build({
            type: ambientType.toUpperCase(),
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

// GET http://localhost:3000/tessel/ambient/all/:type?
router.route('/all/:type?')
    .get(function(req, res, next) {
        var filterType = validator.trim(req.params.type);

        // if filter is not valid return error
        if (!inputHelper.validateType(filterType, true)) {
            res.json('error');
        }

        // define where clause
        var whereClause = {};
        if (filterType != '') {
            whereClause = { where: { type: filterType } };
        }

        // retrieves all records of type X from db
        Ambient.findAll(
            whereClause
        ).then(function(records) {
            res.json(records);
        }).catch(function(err) {
            res.render('error', {
                message: err.name,
                error: err
            });
        });
    });

// GET http://localhost:3000/tessel/ambient/last/:type?
router.route('/last/:type?')
    .get(function(req, res, next) {
        var filterType = validator.trim(req.params.type);

        // if filter is not valid return error
        if (!inputHelper.validateType(filterType, true)) {
            res.json('error');
        }

        // define where clause
        var whereClause = {};
        if (filterType != '') {
            whereClause = { where: { type: filterType } };
        }

        // retrieves all records of type X from db
        Ambient.findOne(
            whereClause
        ).then(function(last) {
            res.json(last);
        }).catch(function(err) {
            res.render('error', {
                message: err.name,
                error: err
            });
        });
    });

module.exports = router;
