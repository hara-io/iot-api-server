var express = require('express');
var passport = require('passport');
var validator = require('validator');
var inputHelper = require('../helpers/validateInput');
var authMiddleware = require('../middlewares/auth');
var Device = require('../models').Device;
var ConfigAmbientSound = require('../models').ConfigAmbientSound;
var router = express.Router();

// invoked for any requested passed to this router
router.use(function(req, res, next) {
    next();
});

// GET http://localhost:3000/tessel/device/list/:device?
router.route('/list/:device?')
    .get(function(req, res, next) {
        var filterDevice = validator.trim(req.params.device);

        // if filter is not valid return error
        if (!inputHelper.validateDevice(filterDevice, true)) {
            var err = new Error('Missing or wrong parameters');
            next(err);
            return;
        }

        // define where clause
        var whereClause = {
          order: null,
          where: {},
          include: [
            { model: ConfigAmbientSound, required: false},
            { model: ConfigAmbientLight, required: false}
          ]
        };

        whereClause['order'] = 'id DESC';
        if (filterDevice != '') {
            whereClause['where']['id'] = filterDevice;
        }

        // retrieves all records of type X from db
        Device.findAll(
          whereClause
        ).then(function(records) {
            res.json(records);
        }).catch(function(err) {
            next(err);
        });
    });

module.exports = router;
