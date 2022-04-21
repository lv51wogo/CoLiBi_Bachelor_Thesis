module.exports = app => {
    const search = require("../controllers/searchController");
    let router = require("express").Router();

    router.get("/occur/:id", search.searchOccurrence);
    router.get("/works/:id", search.searchWorks);
    router.get("/authors/:id", search.searchAuthor)

    app.use('/api/search', router)
};