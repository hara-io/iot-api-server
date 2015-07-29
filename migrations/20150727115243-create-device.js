module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Devices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(15)
      },
      authApi: {
        type: Sequelize.STRING(20)
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
