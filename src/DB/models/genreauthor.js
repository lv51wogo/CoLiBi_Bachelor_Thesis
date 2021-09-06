'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class genreAuthor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      GenreAuthor.associate = (models) => {
        GenreAuthor.belongsTo(models.Author, { foreignKey: 'authorId', targetKey: 'authorId', as: 'Author' });
        GenreAuthor.belongsTo(models.Genre, { foreignKey: 'genreId', targetKey: 'genreId', as: 'Genre' });
      }
    }
  };
  genreAuthor.init({

  }, {
    sequelize,
    modelName: 'genreAuthor',
  });
  return genreAuthor;
};