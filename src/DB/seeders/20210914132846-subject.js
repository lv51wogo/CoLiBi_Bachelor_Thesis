'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const Subjects = require('../JsonData/TestDatenSubjects.json')
        let subjectArray = []
        Subjects.forEach(item => {
            console.log(item)
            subjectArray.push({
                subjectId: item.subjectId,
                createdAt: new Date(),
                updatedAt: new Date()
            })
        })
        return queryInterface.bulkInsert('Subjects', subjectArray)
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Subjects', null, {});
    }
};
