'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('subjectAuthors', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
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
      subjectId: {
        type: Sequelize.INTEGER,
       primaryKey:false,
       references: {
          model: "Subjects",
          key: "id",
       } ,
        allowNull:false,
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
    await queryInterface.dropTable('subjectAuthors');
  }
};