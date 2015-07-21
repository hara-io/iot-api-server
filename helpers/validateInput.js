'use strict';

var validator = require('validator');
var constant = require('../config/constants').ambient;

module.exports = {
    validateDevice: function (device, nullable) {
        if ((nullable && device === '') || (!nullable && device !== '')) {
            return true;
        }
        return false;
    },
    validateDate: function (date, nullable) {
        if ((nullable && date === '') || validator.isDate(date)) {
            return true;
        }
        return false;
    },
    validateValue: function (value, nullable) {
        if ((nullable && value === '') || validator.isFloat(value)) {
            return true;
        }
        return false;
    },
    validateType: function(type, nullable) {
        if ((nullable && type === '') ||
            (validator.isAlpha(type) &&
            validator.isLength(type, 1, 1) &&
            (type === constant.sound || type === constant.light))) {
            return true;
        }
        return false;
    }
}
