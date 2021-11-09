const db = require("../models");
const Work = db.work;
const Occurrence = db.occurrance
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

    Work.findAll({
        include: [{model: Occurrence, where: {term: term}}]
    }).then(data => {
        res.send(data)
    })
};