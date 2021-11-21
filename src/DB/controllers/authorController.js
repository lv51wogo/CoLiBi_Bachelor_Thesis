const db = require("../models");
const {Sequelize} = require("sequelize");
const Author = db.author;
const Work = db.work;
const Occurrence = db.occurrance;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    const authorId = req.query.id;
    let condition = authorId ? {id: {[Op.like]: `%${authorId}%`}} : null;
    Author.findAll({where: condition})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error occurred while retrieving authors."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Author.findByPk(id)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Author with id=" + id
            });
        });
};

exports.findByOccurrence = (req, res) => {
    const term = req.params.term;
    Author.findAll({
        include: [{model: Work, include:[ {model: Occurrence, where: {term: {[Op.like]: `%${term}%`}},attributes:[]}], attributes:[]}],
        where: {
          '$Works.id$':{
              [Op.ne]: null
          }
        }
    }).then(data => {
        res.send(data)
    })
}