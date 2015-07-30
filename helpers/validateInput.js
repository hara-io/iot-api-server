var validator = require('validator');
var constant = require('../config/constants').ambient;

module.exports = {
  checkEmtpy: function(value) {
    return validator.equals(value,'');
  },
  checkDevice: function(device) {
    return device.match(/^([0-9]|[A-Z]){8}-([0-9]|[A-Z]){8}-([0-9]|[A-Z]){8}$/gi);
  },
  checkAmbientType: function(type) {
    return (validator.isAlpha(type) &&
      validator.isLength(type, 1, 1) &&
      (type === constant.sound || type === constant.light));
  },
  checkDate: function(date) {
    return validator.isDate(date);
  },
  checkValue: function(value) {
    return validator.isFloat(value);
  }
}
