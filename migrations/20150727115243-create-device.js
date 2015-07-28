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
        references: 'ConfigAmbientSounds', // <<< Note, its table's name, not object name
        referencesKey: 'id' // <<< Note, its a column name
      },
      configAmbientLightId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: 'ConfigAmbientLights', // <<< Note, its table's name, not object name
        referencesKey: 'id' // <<< Note, its a column name
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
