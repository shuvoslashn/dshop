import JWT from 'jsonwebtoken';
import userModel from './../models/userModel.js';
import { comparePassword, hashPassword } from './../helpers/authHelper.js';

//* Register Controller
export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        //validations
        if (!name) {
            return res.json({ message: `Name is required` });
        }
        if (!email) {
            return res.json({ message: `email is required` });
        }
        if (!password) {
            return res.json({ message: `password is required` });
        }
        if (!phone) {
            return res.json({ message: `phone is required` });
        }
        if (!address) {
            return res.json({ message: `address is required` });
        }

        // check user
        const existingUser = await userModel.findOne({ email });

        // existing user
        if (existingUser) {
            return res.status(200).json({
                success: false,
                message: `Already Registered! Please Login`,
            });
        }

        // register user
        const hashedPassword = await hashPassword(password);

        // save user
        const user = await new userModel({
            name,
            email,
            phone,
            address,
            password: hashedPassword,
        }).save();

        res.status(201).json({
            success: true,
            message: `User registration successful`,
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: `Error in registration`,
            error,
        });
    }
};

//* login Controller
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: `Invalid email or password`,
            });
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: `Email is not registered`,
            });
        }
        const match = await comparePassword(password, user.password);

        if (!match) {
            return res.status(401).json({
                success: false,
                message: `Invalid Password`,
            });
        }

        // token generate
        const token = await JWT.sign(
            { _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            success: true,
            message: `Login successful`,
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
            },
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: `Error in login`,
            error,
        });
    }
};

//! test controller
export const testController = (req, res) => {
    res.send('protected route');
};
