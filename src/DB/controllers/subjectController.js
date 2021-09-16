const db = require("../models");
const Subject = db.subject;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    const subjectId = req.query.subjectId;
    let condition = subjectId ? {subjectId: {[Op.like]: `%${subjectId}%`}} : null;
    Subject.findAll({where: condition})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error occurred while retrieving subjects."
            });
        });
};

exports.findOne = (req, res) => {
    const subjectId = req.params.subjectId;
    Subject.findByPk(subjectId)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Occupation with id=" + subjectId
            });
        });
};