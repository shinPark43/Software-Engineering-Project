import { Router } from 'express';
import { User } from '../db/db.js'; // Ensure the User model is imported from db.js
import { Sport } from '../db/db.js';
import { SportEquipment } from '../db/db.js';

const router = Router();

// Create a new user
router.post('/createUser', async (req, res) => {
    try {
        console.log('Received request body:', req.body);
        const { firstName, lastName, CID, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            console.log('Validation failed: missing required fields');
            return res.status(400).send({ error: 'Missing required fields' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('Validation failed: email already in use');
            return res.status(400).send({ error: 'Email already in use. Please use another email.' });
        }

        const user = new User({ first_name: firstName, last_name: lastName, CID, email, password });
        await user.save();
        const token = await user.generateAuthToken();

        res.status(201).send({ user, token });
    } catch (error) {
        console.error('Error in /createUser:', error);
        res.status(400).send({ error: error.message || 'An error occurred' });
    }
});

router.post('/userLogin', async (req, res) => {
    console.log('Request Body:', req.body); // Debugging log
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({ error: 'Missing email or password' });
        }
        const user = await User.findByCredentials(email, password);
        if (!user) {
            return res.status(401).send({ error: 'Login failed! Check authentication credentials' });
        }
        const token = await user.generateAuthToken();
        res.status(200).send({ user, token });
    } catch (error) {
        console.error(error);
        res.status(400).send({ error: 'An error occurred' });
    }
});

router.get('/getEquipmentsBySport', async (req, res) => {
    try {
        const { sportName } = req.query; // Get the sport name from the query parameters
        const sport = await Sport.findOne({ name: sportName }); // Find the sport by name

        if (!sport) {
            return res.status(404).send({ error: 'Sport not found' });
        }

        const equipments = await SportEquipment.find({ sport: sport._id }); // Find all equipment corresponding to the sport
        res.status(200).send(equipments); // Respond with the list of equipment
    } catch (error) {
        res.status(400).send(error); // Respond with an error
    }
});

export default router;