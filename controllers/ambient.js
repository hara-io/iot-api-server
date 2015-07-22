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

// POST http://localhost:3000/tessel/ambient/save
// Authorization: Basic dGVzc2VsOnRlc3NlbDEyMw==
router.route('/save')
    .post(authMiddleware.isAuthenticated, function(req, res, next) {
        // get type and value from request body
        var ambientDevice = validator.trim(req.body.device);
        var ambientType = validator.trim(req.body.type);
        var ambientValue = validator.trim(req.body.value);
        var ambientDate = validator.trim(req.body.date);

        // check input params
        if (!inputHelper.validateDevice(ambientDevice, false) ||
            !inputHelper.validateType(ambientType, false) ||
            !inputHelper.validateValue(ambientValue, false) ||
            !inputHelper.validateDate(ambientDate, false)) {
            var err = new Error('Missing or wrong parameters');
            next(err);
            return;
        }

        // create the ambient model and save it into db
        Ambient.create({
            device: ambientDevice,
            type: ambientType.toUpperCase(),
            value: ambientValue,
            createdAt: ambientDate
        })
        .then(function(record) {
            res.json(record);
        })
        .catch(function(err) {
            next(err);
        });
    });

// GET http://localhost:3000/tessel/ambient/list/:device/:type?
router.route('/list/:device/:type?')
    .get(function(req, res, next) {
        var filterDevice = validator.trim(req.params.device);
        var filterType = validator.trim(req.params.type);

        // if filter is not valid return error
        if (!inputHelper.validateDevice(filterDevice, false) ||
            !inputHelper.validateType(filterType, true)) {
            var err = new Error('Missing or wrong parameters');
            next(err);
            return;
        }

        // define where clause
        var whereClause = { order: null, where: {} };
        whereClause['order'] = 'id DESC';
        whereClause['where']['device'] = filterDevice;
        if (filterType != '') {
            whereClause['where']['type'] = filterType;
        }

        // retrieves all records of type X from db
        Ambient.findAll(
            whereClause
        ).then(function(records) {
            res.json(records);
        }).catch(function(err) {
            next(err);
        });
    });

// GET http://localhost:3000/tessel/ambient/last/:device/:type?
router.route('/last/:device/:type?')
    .get(function(req, res, next) {
        var filterDevice = validator.trim(req.params.device);
        var filterType = validator.trim(req.params.type);

        // if filter is not valid return error
        if (!inputHelper.validateType(filterType, true)) {
            var err = new Error('Unknown value for param type');
            next(err);
            return;
        }

        var whereClause = { order: null, where: {} };
        whereClause['order'] = 'id DESC';
        whereClause['where']['device'] = filterDevice;
        if (filterType != '') {
            whereClause['where']['type'] = filterType;
        }

        // retrieves the last record of type X from db
        Ambient.findOne(
            whereClause
        ).then(function(last) {
            res.json(last);
        }).catch(function(err) {
            next(err);
        });
    });

module.exports = router;
