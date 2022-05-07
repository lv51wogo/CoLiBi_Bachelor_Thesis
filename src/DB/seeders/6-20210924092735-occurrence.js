'use strict';
const csv = require('csv-parser')
const fs = require('fs')
const results = [];

module.exports = {
    up: async (queryInterface, Sequelize) => {
        fs.createReadStream('../DB/JsonData/CompleteOccurrences.csv')
            .pipe(csv({ separator: ';' }))
            .on('data', (data) => results.push({
                workId: data.File,
                term: data.OccId,
                scientificName: data.Term,
                wordsFrame: data['1000-Words-Frame'],
                sentence: data.Sentence,
                createdAt: new Date(),
                updatedAt: new Date()
            }))
            .on('end', () => {
                console.log(results);
                return queryInterface.bulkInsert('Occurrences', results)
            });

    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Occurrences', null, {});
    }
};
