var express = require('express');
var passport = require('passport');
var inputHelper = require('../helpers/validateInput');
var checkDeiviceMiddleware = require('../middlewares/checkDeviceRequest');
var authMiddleware = require('../middlewares/auth');
var Device = require('../models').Device;
var ConfigAmbientSound = require('../models').ConfigAmbientSound;
var ConfigAmbientLight = require('../models').ConfigAmbientLight;
var router = express.Router();

// invoked for any requested passed to this router
// Authorization: Basic dGVzc2VsOnRlc3NlbDEyMw==
router.use(authMiddleware.isAuthenticated, function(req, res, next) {
  next();
});

// GET http://localhost:3000/tessel/device/list/:device?
router.route('/list/:device?')
  .get(checkDeiviceMiddleware.list, function(req, res, next) {
    var filterDevice = req.params.device;

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
    if (!inputHelper.checkEmtpy(filterDevice)) {
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
