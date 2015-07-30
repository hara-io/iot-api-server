module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Devices', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(26)
      },
      model: {
        allowNull: false,
        type: Sequelize.STRING(8)
      },
      name: {
        unique: true,
        type: Sequelize.STRING(15)
      },
      configAmbientSoundId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        model: 'ConfigAmbientSounds',
        key: 'id'
      },
      configAmbientLightId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        model: 'ConfigAmbientLight',
        key: 'id'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Devices');
  }
};
