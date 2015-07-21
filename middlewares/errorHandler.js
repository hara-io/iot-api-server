'use strict'

module.exports = function errorHandler(err, req, res, next) {
    res.status(err.status || 500);
    res.json(err.message);
}
