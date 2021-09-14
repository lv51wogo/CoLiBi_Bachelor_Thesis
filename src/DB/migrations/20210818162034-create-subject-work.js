'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('subjectWorks', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      workId: {
        type: Sequelize.INTEGER,
        primaryKey: false,
        references: {
          model: "Works",
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
          key: "subjectId",
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
    await queryInterface.dropTable('subjectWorks');
  }
};