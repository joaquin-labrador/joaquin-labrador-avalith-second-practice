'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //add news columns to table userID FK and kmTraveled and year
    await queryInterface.addColumn('Cars', 'userId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
    await queryInterface.addColumn('Cars', 'kmTraveled', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    });
    await queryInterface.addColumn('Cars', 'year', {
      type: Sequelize.INTEGER,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Cars', 'userId');
    await queryInterface.removeColumn('Cars', 'kmTraveled');
    await queryInterface.removeColumn('Cars', 'year');
  }
  

};
