'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Occurrence extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Occurrence.belongsTo(models.Work, {
        foreignKey: 'workId',
        foreignKeyConstraint: true,
        onDelete: 'CASCADE'
      })
    }
  };
  Occurrence.init({
    occId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    term: DataTypes.STRING,
    scientificName: DataTypes.STRING,
    wordsFrame: DataTypes.INTEGER,
    sentence: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Occurrence',
  });
  return Occurrence;
};