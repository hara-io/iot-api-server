var inputHelper = require('../helpers/validateInput');

module.exports = {
  list: function (req, res, next) {

    // get type and value from request body
    var filterDevice = req.params.device;

    // if filter is not valid return error
    if (!inputHelper.checkEmtpy(filterDevice) && !inputHelper.checkDevice(filterDevice)) {
      var err = new Error('Missing or wrong parameters');
      next(err);
    }

    next();
  }
}
