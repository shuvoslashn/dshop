import express from 'express';
import {
    loginController,
    registerController,
} from '../controllers/authController.js';

// router object
const router = express.Router();

//? Register route || Method: POST
router.post('/register', registerController);

//? Login route || Method: POST
router.post('/login', loginController);

export default router;
