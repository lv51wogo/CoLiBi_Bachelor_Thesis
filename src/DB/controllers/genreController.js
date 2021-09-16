const db = require("../models");
const Genre = db.genre;
const Op = db.Sequelize.Op;

// Retrieve all Genres from the database.
exports.findAll = (req, res) => {
    const genreId = req.query.genreId;
    let condition = genreId ? {genreId: {[Op.like]: `%${genreId}%`}} : null;
    Genre.findAll({where: condition})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving genres."
            });
        });
};

// Find a single Genre with an id
exports.findOne = (req, res) => {
    const genreId = req.params.genreId;
    Genre.findByPk(genreId)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Genre with id=" + genreId
            });
        });
};
