module.exports = app => {
    const works = require("../controllers/workController.js");
    let router = require("express").Router();

    router.get("/", works.findAll);
    router.get("/:id", works.findAll);

    app.use('/api/works', router);
};