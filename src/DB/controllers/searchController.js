const db = require("../models");
const { Op } = require("sequelize");
const Occurrence = db.occurrance;
const Work = db.work;
const Author = db.author;

exports.searchOccurrence = (req, res) => {
    const searchTerm = req.params.id;

    Occurrence.findAll({where:{
            [Op.or]: [
                {term: {[Op.like]: `${searchTerm}`}},
                {scientificName: {[Op.like]: `${searchTerm}`}},
            ]
        }
    })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error occurred while retrieving occurrences."
            });
        });
}

exports.searchWorks = (req, res) => {
    const searchTerm = req.params.id;

    Work.findAll({where:{
            [Op.or]: [
                {title: {[Op.like]: `${searchTerm}`}},
                {id: {[Op.like]: `${searchTerm}`}}
            ]
        }
    })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error occurred while retrieving works."
            });
        });
}

exports.searchAuthor = (req,res) => {
    const searchTerm = req.params.id;

    Author.findAll({where:{
            [Op.or]: [
                {author: {[Op.like]: `${searchTerm}`}},
                {id: {[Op.like]: `${searchTerm}`}},
                {forename: {[Op.like]: `${searchTerm}`}},
                {surname: {[Op.like]: `${searchTerm}`}}
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


exports.search = (req, res) => {
    const searchTerm = req.params.id;

    Promise.all([
        Work.findAll({where:{
            [Op.or]: [
                {title: {[Op.like]: `${searchTerm}`}},
                {id: {[Op.like]: `${searchTerm}`}}
            ]
        }
        }),
        Occurrence.findAll({where:{
                [Op.or]: [
                    {term: {[Op.like]: `${searchTerm}`}},
                    {scientificName: {[Op.like]: `${searchTerm}`}},
                ]
            }
        }),
        Author.findAll({where:{
                [Op.or]: [
                    {author: {[Op.like]: `${searchTerm}`}},
                    {id: {[Op.like]: `${searchTerm}`}},
                    {forename: {[Op.like]: `${searchTerm}`}},
                    {surname: {[Op.like]: `${searchTerm}`}}
                ]
            }
        })
        ]
    ).then(data => {
        console.log(data)
        res.send({
            works: data[0],
            occurrences: data[1],
            authors: data[2]
            }
        )
    })
}