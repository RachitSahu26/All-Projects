import express from 'express';
import { loginController, registerController } from '../controllers/authController.js';

const router = express.Router();

// Route for user registration
router.post('/register', registerController);

// login route
router.post('/login',loginController );

export default router;
