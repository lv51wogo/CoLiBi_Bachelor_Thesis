'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('genreAuthors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      authorId: {
        type: Sequelize.INTEGER,
        primaryKey: false,
        references: {
          model: "Authors",
          key: "id"
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      genreId: {
        type: Sequelize.INTEGER,
        primaryKey: false,
        references: {
          model: "Genres",
          key: "genreId",
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
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
    await queryInterface.dropTable('genreAuthors');
  }
};