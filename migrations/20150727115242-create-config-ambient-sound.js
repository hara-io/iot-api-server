module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('ConfigAmbientSounds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      threshold: {
        type: Sequelize.NUMERIC(9, 8),
        allowNull: false
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
    return queryInterface.dropTable('ConfigAmbientSounds');
  }
};
