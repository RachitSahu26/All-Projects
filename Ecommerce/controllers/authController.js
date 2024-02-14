import { comparePassword, hashpassword } from "../helpers/authHelper.js";
import useModel from "../models/useModel.js";
// import User from "../models/useModel.js";
// import Jwt from 'jsonwebtoken';
import Jwt from "jsonwebtoken";
export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        if (!name) {
            return res.send({ error: "Name is Required" });
        }
        if (!email) {
            return res.send({ error: "Email is Required" });
        }
        if (!password) {
            return res.send({ error: "Password is Required" });
        }
        if (!phone) {
            return res.send({ error: "Phone no is Required" });
        }
        if (!address) {
            return res.send({ error: "Address is Required" });
        }
        // checking existing user
        const existingUser = await useModel.findOne({ email })
        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: "Already Register please login",
            });
        }

        // hashedpassword

        const hashedPasswrod = await hashpassword(password);
        const user = await new useModel({
            name,
            email,
            phone,
            address,
            password: hashedPasswrod,
        }).save()

        res.status(201).send({
            success: true,
            message: "User Register Successfully",
            user,
        });




    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Errro in Registeration",
            error,
        });
    }

}

//  export default registerController







// ..................Login controller
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Check user
        const user = await useModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Email is not registered",
            });
        }

        // Compare passwords
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(401).json({
                success: false,
                message: "Invalid Password",
            });
        }

        // Generate JWT token
        const token = Jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                _id: user._id,
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
            message: "Internal server error",
        });
    }
};