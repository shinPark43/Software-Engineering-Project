import pkg from 'mongoose';
const { connect, Schema, model, models } = pkg;
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'; // Import jsonwebtoken
import bcrypt from 'bcryptjs'; // Import bcryptjs
import { reservationMiddleware } from '../middleware/middleware.js'; // Import the middleware
import { userSchema } from '../models/User.js'; // Import the userSchema

// Load environment variables from .env file
dotenv.config();

const connectDB = async () => {
    const mongoURI = process.env.MONGODB_URL;

    if (!mongoURI) {
        console.error('Error: MONGODB_URL environment variable is not defined.');
        process.exit(1); // Exit process with failure
    }

    try {
        await connect(mongoURI, { 
            // These options are deprecated for this new version of Mongoose
                // useNewUrlParser: true,
                // useCreateIndex: true, 
                // useUnifiedTopology: true 
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit process with failure
    }
};

const sportSchema = new Schema({
    sport_id: { type: Number, required: true, unique: true },
    sport_name : { type: String, required: true, unique: true },
});

const reservationSchema = new Schema({
    reservation_id: { type: Number, required: true, unique: true },
    user_id: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    sport_id: { type: Schema.Types.ObjectId, required: true, ref: 'Sport' },
    date: { type: Date, required: true },
    time: { type: String, required: true },
});

// Apply middleware to reservationSchema
reservationMiddleware(reservationSchema);

const sport_equipmentSchema = new Schema({
    equipment_id: { type: Number, required: true, unique: true },
    sport_id: { type: Schema.Types.ObjectId, required: true, ref: 'Sport' },
    equipment_name: { type: String, required: true },
    quantity: { type: Number, required: true },
});

// Check if models already exist before defining them
const User = models.User || model('User', userSchema);
const Sport = models.Sport || model('Sport', sportSchema);
const Reservation = models.Reservation || model('Reservation', reservationSchema);
const SportEquipment = models.SportEquipment || model('SportEquipment', sport_equipmentSchema);

connectDB();

export { User, Sport, Reservation, SportEquipment };