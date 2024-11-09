import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const client = createClient({
    url: process.env.REDIS_URL
});

client.on('connect', () => {
    console.log('Redis client connected');
});

client.on('error', (error: Error) => {
    console.error(error);
});

export default client;