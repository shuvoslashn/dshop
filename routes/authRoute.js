import express from 'express';
import {
    forgotPasswordController,
    loginController,
    registerController,
    testController,
    updateProfileController,
} from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

// router object
const router = express.Router();

//? Register route || Method: POST
router.post('/register', registerController);

//? Login route || Method: POST
router.post('/login', loginController);

//? Forgot Password route || Method: POST
router.post('/forgot-password', forgotPasswordController);

//? test route || Method: GET
router.get('/test', requireSignIn, isAdmin, testController);

//? private auth route for user || Method: GET
router.get('/user-auth', requireSignIn, (req, res) => {
    res.json({ ok: true });
});

//? private auth route for admin || Method: GET
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.json({ ok: true });
});

//? update profile
router.put('/profile', requireSignIn, updateProfileController);

export default router;
