'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class subjectWork extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        subjectWork.associate = (models) => {
        subjectWork.belongsTo(models.Work, { foreignKey: 'workId', targetKey: 'workId', as: 'Work' });
        subjectWork.belongsTo(models.Subject, { foreignKey: 'subjectId', targetKey: 'subjectId', as: 'Subject' });
      }
    }
  };
  subjectWork.init({
  }, {
    sequelize,
    modelName: 'subjectWork',
  });
  return subjectWork;
};