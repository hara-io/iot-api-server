'use strict';

module.exports = function(sequelize, DataTypes) {
    var Ambient = sequelize.define('Ambient', {
        type: DataTypes.CHAR,
        value: DataTypes.FLOAT,
        createdAt: DataTypes.DATE
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });

    return Ambient;
};
