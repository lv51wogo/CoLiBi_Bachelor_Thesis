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




// 'use strict';

// module.exports = {
//     up: async (queryInterface, Sequelize) => {
//         const Occurrences = require('../Data/TestDatenOccurrences.json')
//         let occurArray = []
//         Occurrences.forEach(item => {
//             console.log(item)
//             occurArray.push({
//                 workId: item.workId,
//                 term: item.Term,
//                 scientificName: item.ScientificName,
//                 wordsFrame: item.WordsFrame,
//                 sentence: item.Sentence,
//                 createdAt: new Date(),
//                 updatedAt: new Date()
//             })
//         })
//         return queryInterface.bulkInsert('Occurrences', occurArray)
//     },

//     down: async (queryInterface, Sequelize) => {
//         await queryInterface.bulkDelete('Occurrences', null, {});
//     }
// };