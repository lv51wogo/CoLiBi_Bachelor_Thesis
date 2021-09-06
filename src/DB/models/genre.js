'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Genre extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Genre.belongsToMany(Author, {
                as: 'Genre',
                through: "genreAuthor",
                foreignKey: 'genreId'
            });
            Genre.belongsToMany(Work, {
                as: 'Genre',
                through: "genreWork",
                foreignKey: 'genreId'
            });
        }
    };

    Genre.init({
        sequelize,
        modelName: 'Genre',
    });
    return Genre;
};