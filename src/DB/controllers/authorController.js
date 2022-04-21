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

exports.countOfOccurrence = (req, res) => {
    const term = req.params.term;

    Author.findAll({
        include: [{model: Work, attributes: ['title', 'id', 'year'], include:[{
            model: Occurrence,
            attributes: ['term', 'scientificName', 'workId',[Sequelize.fn('COUNT', Sequelize.col('term')), 'count']]
        }]}],
        attributes:[],
        where: {
            [Op.or]: [
                {author: {[Op.like]: `%${term}`}},
                {id: {[Op.like]: `%${term}%`}},
                {forename: {[Op.like]: `%${term}`}},
                {surname: {[Op.like]: `%${term}`}}
            ]
        },
        group: ['term']
    }).then(data => {
        res.send(data)
    }).catch(error => {
        res.status(500).send({
            message: "Error retrieving count of occurrence per work"
        });
    });
}
