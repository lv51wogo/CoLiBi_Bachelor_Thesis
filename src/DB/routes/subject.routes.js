module.exports = app => {
    const subjects = require("../controllers/subjectController.js");
    let router = require("express").Router();

    router.get("/", subjects.findAll);
    router.get("/:subjectId", subjects.findOne);

    app.use('/api/subjects', router)
}