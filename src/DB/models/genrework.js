'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class genreWork extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        genreWork.associate = (models) => {
        genreWork.belongsTo(models.Work, { foreignKey: 'workId', targetKey: 'workId', as: 'Work' });
        genreWork.belongsTo(models.Genre, { foreignKey: 'genreId', targetKey: 'genreId', as: 'Subject' });
      }
    }
  };
  genreWork.init({
    firstName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'genreWork',
  });
  return genreWork;
};