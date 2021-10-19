module.exports = app => {
    const occurrence = require("../controllers/occurrenceController");

    let router = require("express").Router();

    router.get("/", occurrence.findAll);

    router.get("/:id", occurrence.findOne);

    router.get("/once/", occurrence.findAllDistinct);

    app.use('/api/occur', router);
};