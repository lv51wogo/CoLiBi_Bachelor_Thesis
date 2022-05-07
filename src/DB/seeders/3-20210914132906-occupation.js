'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Occupations = require('../Data/TestDatenOccupations.json')
    let occupationArray = []
    Occupations.forEach( item => {
      console.log(item)
      occupationArray.push({
        occupationId: item.occupationId,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    })
    return queryInterface.bulkInsert('Occupations', occupationArray)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Occupations', null, {});
  }
};
