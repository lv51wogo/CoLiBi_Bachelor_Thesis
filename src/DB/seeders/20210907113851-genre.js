'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Genres = require('../JsonData/TestDatenGenres.json')
    let genreArray = []
    Genres.forEach( item => {
      console.log(item)
      genreArray.push({
        genreId: item.genreId,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    })
    return queryInterface.bulkInsert('Genres', genreArray)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Genres', null, {});
  }
};
