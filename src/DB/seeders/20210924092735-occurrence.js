'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const Occurrences = require('../JsonData/TestDatenOccurrences.json')
        let occurArray = []
        Occurrences.forEach(item => {
            console.log(item)
            occurArray.push({
                workId: item.workId,
                term: item.Term,
                scientificName: item.ScientificName,
                wordsFrame: item.WordsFrame,
                sentence: item.Sentence,
                createdAt: new Date(),
                updatedAt: new Date()
            })
        })
        return queryInterface.bulkInsert('Occurrences', occurArray)
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Occurrences', null, {});
    }
};
