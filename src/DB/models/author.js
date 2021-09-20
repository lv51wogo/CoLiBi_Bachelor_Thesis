'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Author extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Author.hasMany(models.Work, {
                foreignKey: 'authorId'
            });

            Author.belongsToMany(models.Subject, {
                as: "Auth",
                through: "subjectAuthor",
                foreignKey: "authorId"
            });
            Author.belongsToMany(models.Genre, {
                as: "Author",
                through: "genreAuthor",
                foreignKey: "authorId"
            });

            Author.belongsToMany(models.Occupation, {
                as: "Authors",
                through: "occupationAuthor",
                foreignKey: "authorId"
            });
        }
    };
    Author.init({
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        author: DataTypes.STRING, // unique enough to use das PK?
        forename: DataTypes.STRING,
        surname: DataTypes.STRING,
        birthDate: DataTypes.STRING,
        deathDate: DataTypes.STRING,
        gender: DataTypes.STRING,
        workStart: DataTypes.STRING,
        religion: DataTypes.STRING,
        ethnicity: DataTypes.STRING,
        nativeLanguage: DataTypes.STRING,
        childhoodResidence: DataTypes.STRING,
        childhoodRegion: DataTypes.STRING,
        residence: DataTypes.STRING,
        region: DataTypes.STRING,
        literaryPeriod: DataTypes.STRING,
        partners: DataTypes.INTEGER,
        children: DataTypes.INTEGER,
        highestEducation: DataTypes.STRING,
        biodiversity: DataTypes.INTEGER,
        field: DataTypes.STRING,
        occupation: DataTypes.STRING,//array
        country: DataTypes.STRING,
        genre: DataTypes.STRING, //array
        birthPlace: DataTypes.STRING,
        deathPlace: DataTypes.STRING,
        subjects: DataTypes.STRING, //array
        vocabularyCount: DataTypes.INTEGER,
        wordCount: DataTypes.INTEGER,
        language: DataTypes.STRING,
        university: DataTypes.STRING,
        member: DataTypes.STRING,
        deathCause: DataTypes.STRING,
        completedFlag: DataTypes.INTEGER,
        age: DataTypes.INTEGER,
        siblings: DataTypes.INTEGER,
        socialStatus: DataTypes.STRING,
        mainRegion: DataTypes.STRING,
        mainResidence: DataTypes.STRING,
        locality: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Author',
    });
    return Author;
};