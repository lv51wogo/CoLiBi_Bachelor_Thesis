module.exports = app => {
    const authors = require("../controllers/authorController.js");

    let router = require("express").Router();

    router.get("/", authors.findAll);

    router.get("/:id", authors.findOne);

    router.get("/findByOccur/:term", authors.findByOccurrence)

    app.use('/api/authors', router);
};