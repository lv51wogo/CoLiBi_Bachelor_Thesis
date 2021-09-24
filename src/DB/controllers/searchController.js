const db = require("../models");
const { Op } = require("sequelize");
const Occurrence = db.occurrance;
const Work = db.work;
const Author = db.author;

exports.searchOccurrence = (req, res) => {
    const searchTerm = req.params.id;
    Occurrence.findAll({where:{
            [Op.or]: [
                {term: {[Op.like]: `%${searchTerm}%`}},
                {scientificName: {[Op.like]: `%${searchTerm}%`}}
            ]
        }
    })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error occurred while retrieving authors."
            });
        });
}
