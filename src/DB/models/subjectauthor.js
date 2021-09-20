'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class subjectAuthor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        subjectAuthor.associate = (models) => {
        subjectAuthor.belongsTo(models.Author, { foreignKey: 'authorId', targetKey: 'authorId', as: 'Author' });
        subjectAuthor.belongsTo(models.Subject, { foreignKey: 'subjectId', targetKey: 'subjectId', as: 'Subject' });
      }
    }
  };
  subjectAuthor.init({
  }, {
    sequelize,
    modelName: 'subjectAuthor',
  });
  return subjectAuthor;
};