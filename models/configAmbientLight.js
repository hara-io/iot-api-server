module.exports = function(sequelize, DataTypes) {
  var ConfigAmbientLight = sequelize.define('ConfigAmbientLight', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    threshold: {
      type: DataTypes.NUMERIC(9, 8),
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        ConfigAmbientLight.hasMany(models.Device, { foreignKey: 'configAmbientLightId'})
      }
    }
  });
  return ConfigAmbientLight;
};
