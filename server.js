
const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

// get angular app content
app.use(express.static("./src/app/dist/app"));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the CoLiBi application." });
});

require("./src/DB/routes/genre.routes.js")(app);
require("./src/DB/routes/author.routes.js")(app);
require("./src/DB/routes/subject.routes.js")(app);
require("./src/DB/routes/occupation.routes.js")(app);
require("./src/DB/routes/work.routes.js")(app);
require("./src/DB/routes/search.routes.js")(app);
require("./src/DB/routes/occurrence.routes")(app)

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
