module.exports = function(sequelize, DataTypes) {
    var Device = sequelize.define('Device', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING(26)
      },
      model: {
        allowNull: false,
        type: DataTypes.STRING(8)
      },
      name: {
        unique: true,
        type: DataTypes.STRING(15)
      },
      configAmbientSoundId: {
        allowNull: true,
        type: DataTypes.INTEGER,
        model: 'ConfigAmbientSound',
        key: 'id'
      },
      configAmbientLightId: {
        allowNull: true,
        type: DataTypes.INTEGER,
        model: 'ConfigAmbientLight',
        key: 'id'
      }
    }, {
      classMethods: {
        associate: function(models) {
          //associations can be defined here
          Device.belongsTo(models.ConfigAmbientSound, { foreignKey: 'configAmbientSoundId'});
          Device.belongsTo(models.ConfigAmbientLight, { foreignKey: 'configAmbientLightId'});
          Device.hasOne(models.Ambient, { foreignKey: 'deviceId'})
        }
      }
  });

  return Device;
};
