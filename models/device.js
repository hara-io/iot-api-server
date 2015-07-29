module.exports = function(sequelize, DataTypes) {
    var Device = sequelize.define('Device', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING(15)
      },
      authApi: {
        type: DataTypes.STRING(20)
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
            }
        }
    });

    return Device;
};
