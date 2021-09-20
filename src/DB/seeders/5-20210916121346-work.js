'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Works = require('../JsonData/TestDatenWorks.json')
    let worksArray = []
    Works.forEach( item => {
      console.log(item)
      worksArray.push({
        id: item.id,
        authorId: item.Author,
        title: item.Title,
        ageOfPublication: item.Age_Publication,
        year: item.Year,
        join: item.join,
        split: item.split,
        region: item.Region,
        originalLanguage: item.Original_Language,
        literatureForm: item.Literature_Form,
        originCountry: item.Origin,
        downloads: item.Downloads,
        language: item.Language,
        size: item.Size,
        wordsCount: item.Words,
        completedFlag: item.completedFlag,
        literaryPeriod: item.Literary_period,
        literaryForm: item.Literature_Form_v2,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    })
    return queryInterface.bulkInsert('Works', worksArray)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Works', null, {});
  }
};
