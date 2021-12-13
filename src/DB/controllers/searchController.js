const db = require("../models");
const {Op} = require("sequelize");
const {Sequelize} = require("sequelize");
const Occurrence = db.occurrance;
const Work = db.work;
const Author = db.author;

exports.searchOccurrence = (req, res) => {
    const searchTerm = req.params.id;

    Promise.all([
        Occurrence.findAll({
            attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('term')), 'term'], 'scientificName'],
            where: {
                [Op.or]: [
                    {term: {[Op.like]: `%${searchTerm}`}},
                    {scientificName: {[Op.like]: `%${searchTerm} %`}},
                ]
            }
        }),
        Work.findAll({
            include: [{
                model: Occurrence, where: {
                    [Op.or]: [
                        {term: {[Op.like]: `%${searchTerm}`}},
                        {scientificName: {[Op.like]: `%${searchTerm} %`}},
                    ]
                }
            }]
        }),
        Author.findAll({
            include: [{
                model: Work,
                include: [{
                    model: Occurrence, where: {
                        [Op.or]: [
                            {term: {[Op.like]: `%${searchTerm}`}},
                            {scientificName: {[Op.like]: `%${searchTerm} %`}},
                        ]
                    }, attributes: []
                }],
                attributes: []
            }],
            where: {
                '$Works.id$': {
                    [Op.ne]: null
                }
            }
        }),
        Occurrence.findAll({
            attributes: ['term', 'workId'],
            include: [{model: Work, attributes: ['authorId']}],
            where: {
                [Op.or]: [
                    {term: {[Op.like]: `%${searchTerm}`}},
                    {scientificName: {[Op.like]: `%${searchTerm} %`}},
                ]
            }
        })]).then(data => {
        res.send({
                occurrences: data[0],
                works: data[1],
                authors: data[2],
                occurrenceJoin: data[3]
            }
        )
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error occurred while retrieving occurrences."
            });
        });
};

exports.searchWorks = (req, res) => {
    const searchTerm = req.params.id;
    Promise.all([
        Work.findAll({
            where: {
                [Op.or]: [
                    {title: {[Op.like]: `%${searchTerm}%`}},
                    {id: {[Op.like]: `${searchTerm}`}}
                ]
            }
        }),
        Author.findAll({
            include: [{
                model: Work, where:{
                    [Op.or]: [
                        {title: {[Op.like]: `%${searchTerm}%`}},
                        {id: {[Op.like]: `%${searchTerm}%`}}
                    ]
                }, attributes: []
            }]
        }),
        Occurrence.findAll({
            include: [{
                model: Work, where: {
                    [Op.or]: [
                        {title: {[Op.like]: `%${searchTerm}%`}},
                        {id: {[Op.like]: `%${searchTerm}%`}}
                    ]
                }, attributes: []
            }],
            group: ['term']
        }),
        Occurrence.findAll({
            attributes: ['term', 'workId'],
            include: [{
                model: Work, where: {
                    [Op.or]: [
                        {id: {[Op.like]: `%${searchTerm}%`}},
                        {title: {[Op.like]: `%${searchTerm}%`}}
                    ]
                },
                attributes: ['authorId']
            }]
        })
    ]).then(data => {
        res.send({
                works: data[0],
                authors: data[1],
                occurrences: data[2],
                occurrenceJoin: data[3]
            }
        )
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error occurred while retrieving works."
            });
        });
}

exports.searchAuthor = (req, res) => {
    const searchTerm = req.params.id;
    Promise.all([
        Author.findAll({
            where: {
                [Op.or]: [
                    {author: {[Op.like]: `%${searchTerm}`}},
                    {id: {[Op.like]: `%${searchTerm}%`}},
                    {forename: {[Op.like]: `%${searchTerm}`}},
                    {surname: {[Op.like]: `%${searchTerm}`}}
                ]
            }
        }),
        Work.findAll({
            where: {
                [Op.or]: [
                    {authorId: {[Op.like]: `%${searchTerm}%`}},
                ]
            }
        }),
        Occurrence.findAll({
            include: [{
                model: Work, where: {
                    [Op.or]: [
                        {authorId: {[Op.like]: `%${searchTerm}%`}},
                    ]
                }, attributes: []
            }],
            group: ['term']
        }),
        Occurrence.findAll({
            attributes: ['term', 'workId'],
            include: [{
                model: Work, where: {
                    [Op.or]: [
                        {authorId: {[Op.like]: `%${searchTerm}%`}},
                    ]
                },
                attributes: ['authorId']
            }],
        })
    ]).then(data => {
        res.send({
                authors: data[0],
                works: data[1],
                occurrences: data[2],
                occurrenceJoin: data[3]
            }
        )
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error occurred while retrieving authors."
            });
        });
};
