import mongoose from "mongoose";

export class DbConnection {
    private static instance: DbConnection;
    private dbUrl: string;

    private constructor(dbUrl: string) {
        this.dbUrl = dbUrl;
    }

    public static getInstance(dbUrl: string): DbConnection {
        if (!DbConnection.instance) {
            DbConnection.instance = new DbConnection(dbUrl);
        }
        return DbConnection.instance;
    }

    public async connect(): Promise<void> {
        try {
            await mongoose.connect(this.dbUrl);
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
        }
    }

    public async disconnect(): Promise<void> {
        try {
            await mongoose.connection.close();
            console.log('Disconnected from MongoDB');
        } catch (error) {
            console.error('Error disconnecting from MongoDB:', error);
        }
    }

    public async getDb(): Promise<mongoose.Connection> {
        return mongoose.connection;
    }

}