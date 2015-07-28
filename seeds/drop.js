var db = require('../models/index');

Object.keys(db).forEach(function(modelName) {
    if ('associate' in db[modelName]) {
          db[modelName].drop({ cascade: true });
    }
});
