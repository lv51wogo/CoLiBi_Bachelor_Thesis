'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Authors = require('../JsonData/CompleteAuthor.json')
    let authorArray = []
    Authors.forEach( item => {
      console.log(item)
      authorArray.push({
        id: item.id,
        author: item.Author, // unique enough to use das PK?
        forename: item.Forename,
        surname: item.Surname,
        birthDate: item.Birth,
        deathDate: item.Death,
        gender: item.Gender,
        workStart: item.Work_Start,
        religion: item.Religion,
        ethnicity: item.Ethnicity,
        nativeLanguage: item.Native_language,
        childhoodResidence: item.Childhood_Residence,
        childhoodRegion: item.Childhood_Region,
        residence: item.Residence,
        region: item.Region,
        literaryPeriod: item.Literary_period,
        partners: item.Partners,
        children: item.Children,
        highestEducation: item.Highest_Education,
        biodiversity: item.Biodiversity_Specification,
        field: item.Field,
        country: item.Country,
        birthPlace: item.Birthplace,
        deathPlace: item.Deathplace,
        vocabularyCount: item.VocabCount,
        wordCount: item.WordCount,
        language: item.Languages,
        university: item.University,
        member: item.Member,
        deathCause: item.Death_Cause,
        completedFlag: item.completeFlag,
        age: item.Age,
        siblings: item.Siblings,
        socialStatus: item.Social_status,
        mainRegion: item.Main_Region,
        mainResidence: item.Main_Residence,
        locality: item.Locality,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    })
    return queryInterface.bulkInsert('Authors', authorArray)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Authors', null, {});
  }
};
