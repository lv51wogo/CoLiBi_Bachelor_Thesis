module.exports = app => {
    const genres = require("../controllers/genreController.js");

    let router = require("express").Router();

    router.get("/", genres.findAll);

    router.get("/:genreId", genres.findOne);


    app.use('/api/genres', router);
};