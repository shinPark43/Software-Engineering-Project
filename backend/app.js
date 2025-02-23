import dotenv from 'dotenv'; // Import dotenv
import express, { urlencoded, json } from 'express';
import userRouter from './routers/user.js'; // Import the user router
import './db/db.js'; // This will run the code in db.js
import { auth, logger } from './middleware/middleware.js'; // Import the middleware
import cors from 'cors';

// Load environment variables from .env file
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const port = process.env.PORT || 3000;
console.log('MongoDB URL:', process.env.MONGODB_URL); // Check if it's loaded correctly

const app = express();

app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(logger); // Use the logger middleware
app.use('/users', userRouter); // Use the user router with the /users prefix

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is up on port ${port}`);
});