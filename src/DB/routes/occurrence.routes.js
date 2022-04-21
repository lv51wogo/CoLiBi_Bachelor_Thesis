module.exports = app => {
    const occurrence = require("../controllers/occurrenceController");

    let router = require("express").Router();

    router.get("/", occurrence.findAll);
    router.get("findBy/:id", occurrence.findOne);
    router.get("/once/", occurrence.findAllDistinct);
    router.get("/countAll/:term", occurrence.countAllOccurrences);
    router.get("/countAllWork/:term", occurrence.countAllOccurrencesByWork);
    router.get("/count/:term", occurrence.countOccurrence);
    router.get("/workOccurData/:term", occurrence.findWorksForOccurrences);
    router.get("/workOccurDataAuthor/:authorId", occurrence.findWorksOccurrencesForAuthor);
    router.get("/occurForWorks/:term", occurrence.findOccurrencesForWorks)
    router.get("/findByAuthor/:term", occurrence.findByAuthor);

    app.use('/api/occur', router);
};