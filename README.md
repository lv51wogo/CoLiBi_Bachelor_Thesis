# CoLiBi_Bachelor_Thesis
This is a repo for my bachelor thesis project 

# Project Setup

* Prerequisite openssl, node.js 
```sh
$ npm install  to initialize all dependencies 
```

## Certificate Setup
* create self signed key and certificate
```sh
$ openssl req -nodes -new -x509 -keyout server.key -out server.cert
``` 
* add certificates to your favorite browser and accept the risk


## Database and Database-migration 
This projects runs on a SQLite database managed with the Sequelize CLI

After cloning the project run the migration scripts to create the database
The run sequelize commands use:  npm run sequelize + 'sequelize command'

Migration:

To migrate the database use:  db:migrate

To revert all migrations run: 

    for the last migrated file:  db:migrate:undo
    for all migrations: db:migrate:undo:all

If you want ro add additional models use: model:generate --name 'ModelName' --attributes 'attributeName: dataType'
This will create a Model file with the given name, and a related migration 

Seeding:

While seeding Models that have a relationship to another Model the order is important! Using a wrong order
can cause foreign key issues. The Seeds in the project are numbered in the order they should be seeded.  
When seeding all files sequelize cli will seed the files according to their numbers. 

To generate a new Seed use: seed:generate --name 'modelName'

To seed the database with date run:  db:seed:all

Seed single File:  db:seed -

Troubleshooting:

*This some times occurs when seeding the occurrences*

If there are problems with running seeding as singe file (example not data in data bse after seeding).
This can be solved via navigation to src\DB\. Then it is necessary to adjust the config.json in src/DB/config/config.json.
Change the storage path in development to ./database.sqlite3 to ensure the seed will seed the correct database.
Afterwards run npx sequelize-cli db:seed --seed fileName in src\DB\. The seeder should run correctly now.



Undo seeding:

    the most recend seed: db:seed:undo --seed name-of-seed-as-in-data
    all seeds: db:seed:undo:all
    for a singe file: db:seed:undo --seed name-of-seed-as-in-data

## run node.js application 

To run the back-end application during development use: npm run dev
This will run the server on localhost 8080
All accessible paths can be found in the routes folder 

## Angular Front-End Application 

The Front-End part of this application is written in TypeScript with the angular Frame work
All information can be found in the src/app folder 

To work with or run the angular application navigate to the path: \CoLiBi_Bachelor_Thesis\src\app

All Components can be found in: src/app/src/app

# Production Mode
* app serving on [Port 8080](https://localhost:8080/)
```sh
node server.js
```
## Docker
```sh
  $ docker build . -t colibri
  $ docker run  -p  8080:8080 --name colibri-ui colibri:latest
  $ docker stop colibri-ui
  ```
