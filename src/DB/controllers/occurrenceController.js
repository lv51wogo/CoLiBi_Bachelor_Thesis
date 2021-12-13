const db = require("../models");
const {Sequelize} = require("sequelize");
const Occurrence = db.occurrance;
const Work = db.work;
const Author = db.author;

const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    const occurrenceId = req.query.id;
    let condition = occurrenceId ? {id: {[Op.like]: `%${occurrenceId}`}} : null;
    Occurrence.findAll({where: condition})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error occurred while retrieving occurrences."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Occurrence.findByPk(id)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error retrieving Occurrence with id=" + id
            });
        });
};

exports.findAllDistinct = (req, res) => {
    Occurrence.findAll({
        attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('term')), 'term'], 'scientificName', 'OccId'],
    })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error occurred while retrieving distinct occurrences."
            });
        });
};

exports.countAllOccurrences = (req, res) => {
    const term = req.params.term;
    Occurrence.findAndCountAll({
        attributes: ['term', 'scientificName'],
        group: ['term', 'scientificName'],
            where: {
                [Op.or]: [
                    {term: {[Op.like]: `%${term}`}},
                    {scientificName: {[Op.like]: `${term}`}},
                ]
            }
        }
    ).then(data => {
        res.send(data)
    });
};

exports.countOccurrence = (req, res) => {
    const term = req.params.term;
    Occurrence.count({
            where: {[Op.or]: [
                    {term: {[Op.like]: `%${term}`}},
                    {scientificName: {[Op.like]: `${term}`}},
                ]
            }
        }
    ).then(data => {
        console.log(data)
        res.send ( data.toString())
    }).catch(err => {
        res.sendStatus(500).send({
            message:
                err.message || "Error occurred while fetching count of : " + term
        })
    });
};

exports.findWorksForOccurrences = (req, res) => {
    const term = req.params.term;
    Occurrence.findAll({
        include: [{
            model: Work}],
        where: {
            [Op.or]: [
                {term: {[Op.like]: `%${term}`}},
                {scientificName: {[Op.like]: `%${term} %`}},
            ]
        }
    }).then(data => {
        res.send(data)
    })
};

exports.findWorksOccurrencesForAuthor = (req, res) => {
     const authorId = req.params.authorId;
     Occurrence.findAll({
         include: [{
             model: Work, where: {
                 [Op.or]: [
                     {authorId: {[Op.like]: `%${authorId}%`}},
                 ]
             }
         }],
     }).then(data => {
         res.send(data)
     })
}

exports.findOccurrencesForWorks = (req, res) => {
    const term = req.params.term;
    Occurrence.findAll({
        include : [{
            model: Work, where: {
                [Op.or]: [
                    {id: {[Op.like]: `%${term}%`}},
                    {title: {[Op.like]: `%${term}%`}}
                ]
            }
        }]
    }).then(data => {
        res.send(data)
    })
}

exports.findByAuthor = (req, res) => {
    const term = req.params.term;
    Occurrence.findAll({
        include: [{model: Work, where: {
                [Op.or]: [
                    {authorId: {[Op.like]: `%${term}%`}},
                ]
            }, attributes:[]}],

    }).then(data => {
        res.send(data)
    })
}