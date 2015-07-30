module.exports = function(sequelize, DataTypes) {
  var ConfigAmbientSound = sequelize.define('ConfigAmbientSound', {
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
        ConfigAmbientSound.hasMany(models.Device, { foreignKey: 'configAmbientSoundId'})
      }
    }
  });
  return ConfigAmbientSound;
};
