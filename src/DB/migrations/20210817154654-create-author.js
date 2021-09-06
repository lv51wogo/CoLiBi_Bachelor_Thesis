'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Authors', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            author: {
                type: Sequelize.STRING
            },
            forename: {
                type: Sequelize.STRING
            },
            surname: {
                type: Sequelize.STRING
            },
            birthDate: {
                type: Sequelize.DATE
            },
            deathDate: {
                type: Sequelize.DATE
            },
            gender: {
                type: Sequelize.STRING
            },
            workStart: {
                type: Sequelize.STRING
            },
            religion: {
                type: Sequelize.STRING
            },
            ethnicity: {
                type: Sequelize.STRING
            },
            nativeLanguage: {
                type: Sequelize.STRING
            },
            childhoodResidence: {
                type: Sequelize.STRING
            },
            childhoodRegion: {
                type: Sequelize.STRING
            },
            residence: {
                type: Sequelize.STRING
            },
            region: {
                type: Sequelize.STRING
            },
            literaryPeriod: {
                type: Sequelize.STRING
            },
            partners: {
                type: Sequelize.INTEGER
            },
            children: {
                type: Sequelize.INTEGER
            },
            highestEducation: {
                type: Sequelize.STRING
            },
            biodiversity: {
                type: Sequelize.INTEGER
            },
            field: {
                type: Sequelize.STRING
            },
            occupation: {
                type: Sequelize.STRING
            },//array
            country: {
                type: Sequelize.STRING
            },
            genre: {
                type: Sequelize.STRING
            }, //array
            birthPlace: {
                type: Sequelize.STRING
            },
            deathPlace: {
                type: Sequelize.STRING
            },
            subjects: {
                type: Sequelize.STRING
            }, //array
            vocabularyCount: {
                type: Sequelize.INTEGER
            },
            wordCount: {
                type: Sequelize.INTEGER
            },
            language: {
                type: Sequelize.STRING
            },
            university: {
                type: Sequelize.STRING
            },
            member: {
                type: Sequelize.STRING
            },
            deathCause: {
                type: Sequelize.STRING
            },
            completedFlag: {
                type: Sequelize.INTEGER
            },
            age: {
                type: Sequelize.INTEGER
            },
            siblings: {
                type: Sequelize.INTEGER
            },
            socialStatus: {
                type: Sequelize.STRING
            },
            mainRegion: {
                type: Sequelize.STRING
            },
            mainResidence: {
                type: Sequelize.STRING
            },
            locality: {
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Authors');
    }
};