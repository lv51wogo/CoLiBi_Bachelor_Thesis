module.exports = app => {
    const authors = require("../controllers/authorController.js");

    let router = require("express").Router();

    router.get("/", authors.findAll);
    router.get("/:id", authors.findOne);
    router.get("/findByOccur/:term", authors.findByOccurrence)
    router.get("/countOccurs/:term", authors.countOfOccurrence)

    app.use('/api/authors', router);
};