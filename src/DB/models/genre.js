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
            Genre.belongsToMany(models.Author, {
                as: 'Genres',
                through: "genreAuthor",
                foreignKey: 'genreId'
            });
            Genre.belongsToMany(models.Work, {
                as: 'Genre',
                through: "genreWork",
                foreignKey: 'genreId'
            });
        }
    };

   Genre.init({
       genreId: {
           type: DataTypes.STRING,
           primaryKey: true
       }
    }, {
        sequelize: sequelize,
        modelName: 'Genre',
    });
    return Genre;
};