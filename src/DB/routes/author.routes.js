module.exports = app => {
    const authors = require("../controllers/authorController.js");

    let router = require("express").Router();

    router.get("/", authors.findAll);

    router.get("/:id", authors.findOne);

    app.use('/api/authors', router);
};