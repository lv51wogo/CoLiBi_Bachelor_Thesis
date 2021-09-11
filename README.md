# CoLiBi_Bachelor_Thesis
This is a repo for my bachelor thesis project 

# Project Setup
Make sure node.js is installed on your device

run:  -npm install  to initialize all dependencies 


## Database and Database-migration 
This projects runs on a SQLite database managed with the Sequelize CLI

Migration:

To migrate the database run: npx sequelize-cli db:migrate

To revert all migrations run: 

    for the last migrated file: npx sequelize-cli db:migrate:undo
    for all migrations: npx sequelize-cli db:migrate:undo:all

Seeding:

To seed the database with date run: npx sequelize-cli db:seed:all