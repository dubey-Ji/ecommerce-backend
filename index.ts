import { main } from "./app";
import { DbConnection } from "./src/config/dbconnection";
import client from "./src/config/redis";

const dbUrl = process.env.DB_URL as string;
const dbConnection = DbConnection.getInstance(dbUrl);

dbConnection.connect()
.then(() => {
    client.connect()
    .then(() => {
        main();
    })
    .catch((error: any) => {
        console.error('Error connecting to Redis:', error);
        process.exit(1);
    });
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
});

