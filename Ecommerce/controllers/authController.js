import { hashpassword } from "../helpers/authHelper.js";
import User from "../models/useModel.js";

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
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: "Already Register please login",
            });
        }

        // hashedpassword

        const hashedPasswrod = await hashpassword(password);
        const user = await new User({
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