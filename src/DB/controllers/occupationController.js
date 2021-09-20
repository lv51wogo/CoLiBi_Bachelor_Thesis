const db = require("../models");
const Occupation = db.occupation;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    const occupationId = req.query.occupationId;
    let condition = occupationId ? {occupationId: {[Op.like]: `%${occupationId}%`}} : null;
    Occupation.findAll({where: condition})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Error occurred while retrieving occupations."
            });
        });
};

exports.findOne = (req, res) => {
    const occupationId = req.params.occupationId;
    Occupation.findByPk(occupationId)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Occupation with id=" + occupationId
            });
        });
};