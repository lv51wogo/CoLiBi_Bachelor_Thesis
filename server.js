
// const express = require("express");
// const cors = require("cors");

// const app = express();

// var corsOptions = {
//     origin: "http://localhost:4200"
// };

// app.use(cors(corsOptions));

// // parse requests of content-type - application/json
// app.use(express.json());

// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true }));


// app.use(express.static(process.cwd()+"/src/app/dist/app"));


// // simple route
// app.get("/", (req, res) => {
//     res.json({ message: "Welcome to the CoLiBi application." });
//     res.sendFile(process.cwd()+"/src/app/dist/app");
// });

// require("./src/DB/routes/genre.routes.js")(app);
// require("./src/DB/routes/author.routes.js")(app);
// require("./src/DB/routes/subject.routes.js")(app);
// require("./src/DB/routes/occupation.routes.js")(app);
// require("./src/DB/routes/work.routes.js")(app);
// require("./src/DB/routes/search.routes.js")(app);
// require("./src/DB/routes/occurrence.routes")(app)

// // set port, listen for requests
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}.`);
// });


const express = require("express");
const cors = require("cors");
const users = [];
const bodyParser = require("body-parser");
var https = require('https');
var fs = require('fs');

var corsOptions = {
    origin: "http://localhost:4200"
};

var options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
  };


const app = express();


app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.static(process.cwd()+"/src/app/dist/app"));

app.get('/api/users', (req, res) => {
    res.json(users);
  });

app.post('/api/user', (req, res) => {
    const user = req.body.user;
    users.push(user);
    res.json("user addedd");
  });


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the CoLiBi application." });
    res.sendFile(process.cwd()+"/src/app/dist/app")
});

require("./src/DB/routes/genre.routes.js")(app);
require("./src/DB/routes/author.routes.js")(app);
require("./src/DB/routes/subject.routes.js")(app);
require("./src/DB/routes/occupation.routes.js")(app);
require("./src/DB/routes/work.routes.js")(app);
require("./src/DB/routes/search.routes.js")(app);
require("./src/DB/routes/occurrence.routes")(app)



// set port, listen for requests using https
const PORT = process.env.PORT || 8080;
https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app).listen(PORT, () => {
  console.log('Listening on port 8080...')
})
