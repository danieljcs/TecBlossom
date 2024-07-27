'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Characters', 'deletedAt', {
      type: Sequelize.DATE,
      allowNull: true,
      after: 'is_favorite' // Opcional: coloca el campo en la posición deseada
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Characters', 'deletedAt');
  }
};
