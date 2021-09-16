const db = require("../models");
const Author = db.author;
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