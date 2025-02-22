import { Router } from 'express';
import { User } from '../db/db.js'; // Ensure the User model is imported from db.js

const router = Router();

// Create a new user
router.post('/createUser', async (req, res) => {
    try {
        const { firstName, lastName, CID, email, password } = req.body; // Destructure the input from the request body

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ error: 'Email already in use. Please use another email.' });
        }

        const user = new User({ first_name: firstName, last_name: lastName, CID, email, password }); // Create a new user with the input
        await user.save(); // Save the user
        const token = await user.generateAuthToken(); // Generate an authentication token

        res.status(201).send({ user, token }); // Respond with the user and token
    } catch (error) {
        res.status(400).send(error); // Respond with an error
    }
});

router.post('/userLogin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);
        if (!user) {
            return res.status(401).send({ error: 'Login failed! Check authentication credentials' });
        }

        const token = await user.generateAuthToken(); // Generate an authentication token
        res.status(200).send({ user, token }); // Respond with the user and token
    } catch (error) {
        res.status(400).send(error);
    }
});

export default router;