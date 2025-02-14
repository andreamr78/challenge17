import express from 'express';
import dotenv from 'dotenv';
import db from './config/connection.js';
import routes from './routes/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection (Use async function)
const startServer = async () => {
    try {
        await db(); // Ensure DB connects before starting the server
        app.use(routes);
        app.listen(PORT, () => {
            console.log(`✅ API server running on port ${PORT}!`);
        });
    } catch (error) {
        console.error("❌ Failed to connect to database:", error);
        process.exit(1); // Stop execution if DB connection fails
    }
};

startServer();