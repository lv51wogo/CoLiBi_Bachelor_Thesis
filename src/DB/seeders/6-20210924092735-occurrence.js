'use strict';
const csv = require('csv-parser')
const fs = require('fs')
const path = require('path');
const occPath = path.join(__dirname, '../Data/TestDataOccurrence.csv');
const results = [];

module.exports = {
    up: async (queryInterface, Sequelize) => {
        fs.createReadStream(occPath)
            .pipe(csv({ separator: ';' }))
            .on('data',  (data) => results.push(
              {
                workId: data.workId,
                term: data.Term,
                scientificName: data['Scientific Name'],
                wordsFrame: data.WordsFrame,
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
