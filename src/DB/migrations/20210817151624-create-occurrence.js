'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Occurrences', {
            OccId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                primaryKey: true,
            },
            workId: {
                type: Sequelize.STRING,
                foreignKey: true,
                onDelete: 'CASCADE',
                references: {
                    model: 'Works',
                    key: 'id',
                    as: 'workId'
                }
            },
            name: {
                type: Sequelize.STRING
            },
            scientificName: {
                type: Sequelize.STRING,
            },
            wordsFrame: {
                type: Sequelize.INTEGER,
            },
            sentence: {
                type: Sequelize.STRING
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
        await queryInterface.dropTable('Occurrences');
    }
};