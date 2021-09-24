module.exports = app => {
    const search = require("../controllers/searchController");
    let router = require("express").Router();

    router.get("/occur/:id", search.searchOccurrence);

    app.use('/api/search', router)
};