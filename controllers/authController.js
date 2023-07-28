import userModel from './../models/userModel.js';
import { hashPassword } from './../helpers/authHelper.js';

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        //validations
        if (!name) {
            return res.json({ error: `Name is required` });
        }
        if (!email) {
            return res.json({ error: `email is required` });
        }
        if (!password) {
            return res.json({ error: `password is required` });
        }
        if (!phone) {
            return res.json({ error: `phone is required` });
        }
        if (!address) {
            return res.json({ error: `address is required` });
        }

        // check user
        const existingUser = await userModel.findOne({ email });

        // existing user
        if (existingUser) {
            return res.status(200).json({
                success: true,
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
