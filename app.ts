import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from "helmet";
import { runBootScripts } from './src/boot';
import cookieParser from 'cookie-parser';


const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.REACT_ORIGIN,
    credentials: true
}));
app.use(helmet())

// Router Initalization
import router from './src/routes/router';
app.use('/api', router);

function main() {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
        console.log(`Server is listening at port ${PORT}`);
        // runBootScripts();
    });
}

export { main };