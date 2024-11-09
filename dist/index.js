"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const dbconnection_1 = require("./src/config/dbconnection");
const dbUrl = process.env.DB_URL;
const dbConnection = dbconnection_1.DbConnection.getInstance(dbUrl);
dbConnection.connect()
    .then(() => {
    (0, app_1.main)();
})
    .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
