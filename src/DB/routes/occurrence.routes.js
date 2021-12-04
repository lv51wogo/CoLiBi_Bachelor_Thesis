module.exports = app => {
    const occurrence = require("../controllers/occurrenceController");

    let router = require("express").Router();

    router.get("/", occurrence.findAll);
    router.get("findBy/:id", occurrence.findOne);
    router.get("/once/", occurrence.findAllDistinct);
    router.get("/countAll/:term", occurrence.countAllOccurrences);
    router.get("/count/:term", occurrence.countOccurrence);
    router.get("/workOccurData/:term", occurrence.findWorksForOccurrences);
    router.get("/workOccurDataAuthor/:authorId", occurrence.findWorksOccurrencesForAuthor);

    app.use('/api/occur', router);
};