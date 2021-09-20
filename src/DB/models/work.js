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

            Work.belongsToMany(models.Subject, {
                as: "Works",
                through: "subjectWork",
                foreignKey: "workId"
            });

            Work.belongsToMany(models.Genre, {
                as: "Work",
                through: "genreWork",
                foreignKey: "workId"
            });
        }
    };

    Work.init({
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        title: DataTypes.STRING,
        ageOfPublication: DataTypes.INTEGER,
        year: DataTypes.STRING,
        join: DataTypes.INTEGER,
        split: DataTypes.INTEGER,
        region: DataTypes.STRING,
        originalLanguage: DataTypes.STRING,
        literatureForm: DataTypes.STRING,
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