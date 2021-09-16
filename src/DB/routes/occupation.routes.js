module.exports = app => {
    const occupation = require("../controllers/occupationController.js");
    let router = require("express").Router();

    router.get("/", occupation.findAll);
    router.get("/:occupationId", occupation.findOne);

    app.use('/api/occupations', router);
};;