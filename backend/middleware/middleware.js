import jwt from 'jsonwebtoken';
import { User } from '../models/User.js'; // Ensure the User model is imported from the models folder

// Middleware for reservationSchema
export const reservationMiddleware = (schema) => {
    schema.pre('save', async function(next) {
        const user = await User.findById(this.user_id);
        if (!user) {
            throw new Error('User not found');
        }
        next();
    });
};

// Authentication middleware
export const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error();
        }

        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

// Example of another middleware (e.g., logging middleware)
export const logger = (req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
};