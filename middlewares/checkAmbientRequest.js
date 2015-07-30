var inputHelper = require('../helpers/validateInput');

module.exports = {
  list: function(req, res, next) {
    // get type and value from request body
    var filterDevice = req.params.device;
    var filterType = req.params.type;

    // check input params
    if(!inputHelper.checkDevice(filterDevice) ||
      (!inputHelper.checkEmtpy(filterType) && !inputHelper.checkAmbientType(filterType))) {
      var err = new Error('Missing or wrong parameters');
      next(err);
    }

    next();
  },
  last: function(req, res, next) {
    // get type and value from request body
    var filterDevice = req.params.device;
    var filterType = req.params.type;

    // check input params
    if(!inputHelper.checkDevice(filterDevice) ||
      (!inputHelper.checkEmtpy(filterType) && !inputHelper.checkAmbientType(filterType))) {
      var err = new Error('Missing or wrong parameters');
      next(err);
    }

    next();
  },
  save: function(req, res, next) {
    // get type and value from request body
    var ambientDevice = req.body.device;
    var ambientType = req.body.type;
    var ambientValue = req.body.value;
    var ambientDate = req.body.date;

    // check input params
    if (!inputHelper.checkDevice(ambientDevice) ||
        !inputHelper.checkAmbientType(ambientType) ||
        !inputHelper.checkValue(ambientValue) ||
        !inputHelper.checkDate(ambientDate)) {
        var err = new Error('Missing or wrong parameters');
        next(err);
    }

    next();
  }
}
