const db = require("../models");
const {Sequelize} = require("sequelize");
const Work = db.work;
const Occurrence = db.occurrance;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    const id = req.query.id;
    let condition = id ? {id: {[Op.like]: `%${id}%`}} : null;
    Work.findAll({where: condition})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error occurred while retrieving works."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Work.findByPk(id)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Work with id=" + id
            });
        });
};

exports.findByOccurrence = (req, res) => {
    const term = req.params.term;

    Work.findAll({
        include: [{
            model: Occurrence, where: {
                [Op.or]: [
                    {term: {[Op.like]: `%${term}`}},
                    {scientificName: {[Op.like]: `%${term} %`}},
                ]
            }
        }]
    }).then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Error occurred while retrieving works."
        });
    });
};

exports.findByAuthor = (req, res) => {
    const term = req.params.term;

    Work.findAll({
        where: {
            [Op.or]: [
                {authorId: {[Op.like]: `${term}`}},
            ]
        }
    }).then(data => {
        res.send(data)
    })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Works related to given author "
            });
        });
}

exports.countOfOccurrencePerWork = (req, res) => {
    const term = req.params.term;

    Work.findAll({
        attributes: ['title', 'id', 'year', [Sequelize.fn('COUNT', Sequelize.col('term')), 'count']],
        include: [{
            model: Occurrence, where: {
                [Op.or]: [
                    {term: {[Op.like]: `%${term}`}},
                    {scientificName: {[Op.like]: `%${term} %`}},
                ]
            },
            attributes: ['term']
        }],
        group: ['year']
    }).then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message: "Error retrieving count of occurrence per work "
        });
    });
}


exports.countOfOccurrencePerWorkForAuthor = (req, res) => {
    const term = req.params.term;

    Work.findAll({
        attributes: ['title', 'id', 'year', [Sequelize.fn('COUNT', Sequelize.col('term')), 'count']],
        include: [{
            model: Occurrence,
            attributes: ['term']
        }],
        where: {
            [Op.or]: [
                {authorId: {[Op.like]: `%${term}%`}},
            ]
        },
        group: ['title']
    }).then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message: "Error retrieving count of occurrence per work for Author"
        });
    });
}

exports.countOfOccurrence = (req, res) => {
    const term = req.params.term;

    Work.findAll({
        attributes: ['title', 'id', 'year'],
        include: [{
            model: Occurrence,
            attributes: ['term', 'scientificName', [Sequelize.fn('COUNT', Sequelize.col('term')), 'count']]
        }],
        where: {
            [Op.or]: [
                {title: {[Op.like]: `%${term}%`}},
                {id: {[Op.like]: `${term}`}}
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
