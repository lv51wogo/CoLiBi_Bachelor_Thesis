module.exports = app => {
    const works = require("../controllers/workController.js");
    let router = require("express").Router();

    router.get("/", works.findAll);
    router.get("/:id", works.findOne);
    router.get("/findByOccur/:term", works.findByOccurrence);
    router.get("/findByAuthor/:term", works.findByAuthor);

    app.use('/api/works', router)
};