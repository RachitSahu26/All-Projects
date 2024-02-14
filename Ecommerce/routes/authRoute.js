import express from 'express';
import { loginController, registerController } from '../controllers/authController.js';

const router = express.Router();

// Route for user registration
router.post('/register', registerController);



// Route for user Login
router.post('/login', loginController);

export default router;
