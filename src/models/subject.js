'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Subject.belongsToMany(Author, {
        as: 'Subject',
        through: "subjectAuthor",
        foreignKey:'subjectId'
      });
    }
  };
  Subject.init({
    subjectsId: {
    type: DataTypes.INTEGER,
        primaryKey: true,
  },
  }, {
    sequelize,
    modelName: 'Subject',
  });
  return Subject;
};