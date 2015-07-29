var constant = require('../config/constants').ambient;

module.exports = function(sequelize, DataTypes) {
    var Ambient = sequelize.define('Ambient', {
      id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
      },
      deviceId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        model: 'Device',
        key: 'id'
      },
      type: {
          allowNull: false,
          type: DataTypes.ENUM,
          values: [constant.sound, constant.light]
      },
      value: {
          allowNull: false,
          type: DataTypes.NUMERIC(9, 8)
      },
      createdAt: {
          allowNull: false,
          type: DataTypes.DATE
      }
    }, {
        classMethods: {
            associate: function(models) {
                //associations can be defined here
                //Ambient.belongsTo(models.Device, { foreignKey: 'deviceId'});
            }
        }
    });

    return Ambient;
};
