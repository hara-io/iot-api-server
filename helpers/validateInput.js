'use strict';

var validator = require('validator');
var constant = require('../config/constants').ambient;

module.exports = {
    validateAll: function(type, value, date) {
        if (validator.isFloat(value) &&
            validator.isAlpha(type) &&
            validator.isLength(type, 1, 1) &&
            (type === constant.sound || type === constant.light) &&
            validator.isDate(date)) {

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
