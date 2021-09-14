'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Works', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            authorId: {
                type: Sequelize.STRING,
                foreignKey: true,
                onDelete: 'CASCADE',
                references: {
                    model: 'Authors',
                    key: 'id',
                    as: 'authorId'
                }
            },
            title: {
                type: Sequelize.STRING
            },
            ageOfPublication: {
                type: Sequelize.INTEGER
            },
            year: {
                type: Sequelize.DATE
            },
            join: {
                type: Sequelize.INTEGER
            },
            split: {
                type: Sequelize.INTEGER
            },
            region: {
                type: Sequelize.STRING
            },
            originalLanguage: {
                type: Sequelize.STRING,
            },
            literatureForm: {
                type: Sequelize.STRING
            },
            originCountry: {
                type: Sequelize.STRING
            },
            downloads: {
                type: Sequelize.INTEGER
            },
            subjects: {
                type: Sequelize.STRING
            },
            language: {
                type: Sequelize.STRING
            },
            size: {
                type: Sequelize.INTEGER
            },
            wordsCount: {
                type: Sequelize.INTEGER
            },
            completedFlag: {
                type: Sequelize.INTEGER
            },
            literaryPeriod: {
                type: Sequelize.STRING
            },
            literaryForm: {
                type: Sequelize.STRING
            },
            rFrameMean: {
                type: Sequelize.FLOAT
            },
            nFrameMean: {
                type: Sequelize.FLOAT
            },
            hFrameMean: {
                type: Sequelize.FLOAT
            },
            sFrameMean: {
                type: Sequelize.FLOAT
            },
            rWork: {
                type: Sequelize.FLOAT
            },
            nWork: {
                type: Sequelize.FLOAT
            },
            hWork: {
                type: Sequelize.FLOAT
            },
            sWork: {
                type: Sequelize.FLOAT
            },
            rBeta: {
                type: Sequelize.FLOAT
            },
            hBeta: {
                type: Sequelize.FLOAT
            },
            sBeta: {
                type: Sequelize.FLOAT
            },
            rFrameMeanGenDiv: {
                type: Sequelize.FLOAT
            },
            rWorkGenDiv: {
                type: Sequelize.FLOAT
            },
            nFrameMeanGenDiv: {
                type: Sequelize.FLOAT
            },
            nWorkGenDiv: {
                type: Sequelize.FLOAT
            },
            rBetaGenDiv: {
                type: Sequelize.FLOAT
            },
            nBetaGenDiv: {
                type: Sequelize.FLOAT
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
        await queryInterface.dropTable('Works');
    }
};