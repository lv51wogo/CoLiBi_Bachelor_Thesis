'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class occupationAuthor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        occupationAuthor.associate = (models) => {
        occupationAuthor.belongsTo(models.Author, { foreignKey: 'authorId', targetKey: 'authorId', as: 'Author' });
        occupationAuthor.belongsTo(models.Genre, { foreignKey: 'occupationId', targetKey: 'occupationId', as: 'Occupation' });
      }
    }
  };
  occupationAuthor.init({
  }, {
    sequelize,
    modelName: 'occupationAuthor',
  });
  return occupationAuthor;
};