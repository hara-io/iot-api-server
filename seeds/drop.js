var db = require('../models/index');

//Drop SequelizeMeta Table
db.sequelize.queryInterface.dropTable('SequelizeMeta');

//Drop Objects Tables
Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].drop({ cascade: true });
  }
});
