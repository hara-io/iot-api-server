var express = require('express');
var passport = require('passport');
var inputHelper = require('../helpers/validateInput');
var authMiddleware = require('../middlewares/auth');
var checkRequestMiddleware = require('../middlewares/checkAmbientRequest');
var Ambient = require('../models').Ambient;
var router = express.Router();

// invoked for any requested passed to this router
// Authorization: Basic dGVzc2VsOnRlc3NlbDEyMw==
router.use(authMiddleware.isAuthenticated, function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// POST http://localhost:3000/tessel/ambient/save
router.route('/save')
  .post(checkRequestMiddleware.save, function(req, res, next) {
    // get type and value from request body
    var ambientDevice = req.body.device;
    var ambientType = req.body.type;
    var ambientValue = req.body.value;
    var ambientDate = req.body.date;

    // create the ambient model and save it into db
    Ambient.create({
      deviceId: ambientDevice,
        type: ambientType.toUpperCase(),
        value: parseFloat(ambientValue),
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
  .get(checkRequestMiddleware.list ,function(req, res, next) {
    var filterDevice = req.params.device;
    var filterType = req.params.type;

    // define where clause
    var whereClause = {
      order: null,
      where: {}
    };

    whereClause['order'] = 'id DESC';
    whereClause['where']['deviceId'] = filterDevice;
    if (!inputHelper.checkEmtpy(filterType)) {
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
  .get(checkRequestMiddleware.last, function(req, res, next) {
    var filterDevice = req.params.device;
    var filterType = req.params.type;

    // define where clause
    var whereClause = {
      order: null,
      where: {}
    };

    whereClause['order'] = 'id DESC';
    whereClause['where']['deviceId'] = filterDevice;
    if (!inputHelper.checkEmtpy(filterType)) {
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
