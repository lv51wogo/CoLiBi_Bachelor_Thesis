module.exports = app => {
    const works = require("../controllers/workController.js");
    let router = require("express").Router();

    router.get("/", works.findAll);
    router.get("/:id", works.findOne);
    router.get("/findByOccur/:term", works.findByOccurrence);
    router.get("/findByAuthor/:term", works.findByAuthor);
    router.get("/countTerm/:term", works.countOfOccurrencePerWork);
    router.get("/countTermAuthor/:term", works.countOfOccurrencePerWorkForAuthor);
    router.get("/countOccur/:term", works.countOfOccurrence);

    app.use('/api/works', router)
};