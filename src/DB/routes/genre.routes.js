module.exports = app => {
    const genres = require("../controllers/genreController.js");

    let router = require("express").Router();

    // Retrieve all Tutorials
    router.get("/", genres.findAll);

    // Retrieve a single Tutorial with id
    router.get("/:genreId", genres.findOne);


    app.use('/api/genres', router);
};