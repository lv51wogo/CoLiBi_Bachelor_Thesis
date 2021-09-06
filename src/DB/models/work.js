'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Work extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Work.hasMany(models.Occurrence, {
                foreignKey: 'workId'
            });

            Work.belongsTo(models.Author, {
                foreignKey: 'authorId',
                foreignKeyConstraint: true,
                onDelete: 'CASCADE'
            });

            Work.belongsToMany(Subject, {
                as: "Work",
                through: "subjectWork",
                foreignKey: "workId"
            });

            Work.belongsToMany(Genre, {
                as: "Work",
                through: "genreWork",
                foreignKey: "workId"
            });
        }
    };

    Work.init({
        title: DataTypes.STRING,
        ageOfPublication: DataTypes.INTEGER,
        year: DataTypes.DATE,
        join: DataTypes.INTEGER,
        split: DataTypes.INTEGER,
        region: DataTypes.STRING,
        originalLanguage: DataTypes.STRING,
        literatureForm: DataTypes.STRING,
        genre: DataTypes.STRING, // Array workaround or Postgress?
        originCountry: DataTypes.STRING,
        downloads: DataTypes.INTEGER,
        subjects: DataTypes.STRING, //array
        language: DataTypes.STRING,
        size: DataTypes.INTEGER,
        wordsCount: DataTypes.INTEGER,
        completedFlag: DataTypes.INTEGER,
        literaryPeriod: DataTypes.STRING,
        literaryForm: DataTypes.STRING,
        rFrameMean: DataTypes.FLOAT,
        nFrameMean: DataTypes.FLOAT,
        hFrameMean: DataTypes.FLOAT,
        sFrameMean: DataTypes.FLOAT,
        rWork: DataTypes.FLOAT,
        nWork: DataTypes.FLOAT,
        hWork: DataTypes.FLOAT,
        sWork: DataTypes.FLOAT,
        rBeta: DataTypes.FLOAT,
        hBeta: DataTypes.FLOAT,
        sBeta: DataTypes.FLOAT,
        rFrameMeanGenDiv: DataTypes.FLOAT,
        rWorkGenDiv: DataTypes.FLOAT,
        nFrameMeanGenDiv: DataTypes.FLOAT,
        nWorkGenDiv: DataTypes.FLOAT,
        rBetaGenDiv: DataTypes.FLOAT,
        nBetaGenDiv: DataTypes.FLOAT
    }, {
        sequelize,
        modelName: 'Work',
    });
    return Work;
};