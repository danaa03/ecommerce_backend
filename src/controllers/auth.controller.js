import bcrypt from "bcrypt";
import { generateEmailVerificationToken} from "../services/jwt.services.js"
import { sendVerificationMail } from "../services/email.services.js";
import { getUserRepo } from "../db/repo.js";
import { userLogin, createUser, existingUser, verifyUser } from "./user.controller.js";
import { createCart } from "./cart.controller.js";

export const login = async(req,res) => {
    try {
        const {email, password} = req.body;
        const userResponse = await userLogin(email, password);

        res.status(200).json(userResponse);
    }
    catch (err) {
        console.msg(err);
        if (err.message === "Email not registered" || err.message === "Authentication failed") {
            return res.status(401).json({ msg: err.message });
        }
        if (err.message === "Please verify your email before logging in.") {
            return res.status(403).json({ msg: err.message });
        }
        res.status(500).json({msg: "Login Error", msg: err});
    }
};

export const signup = async(req,res) => {
    try {
        const { confirmPassword, password, email, ...rest } = req.body;

        //check if email already exists
        if (await existingUser(email)) 
        {
            return res.status(400).json({ msg: 'Email Already Exists' });
        }

        //check if passwords match
        if(confirmPassword!== password)
        {
            return res.status(400).json({ msg: 'Passwords dont match' });
        }

        const userDetails = {
            password,
            email,
            ...rest,
        }

        const newUser = await createUser(userDetails);

        await createCart(newUser.id);

        res.status(201).json({ message: 'Email sent for verification.', user: newUser });
    } catch (msg) {
        console.log("Error during registeration: ", msg);
        res.status(500).json({ msg: 'Registration failed' });
    }
};

export const verifyEmail = async (req, res) => {
    const { token } = req.query;

    if (!token) {
        return res.status(400).json({ msg: "Verification token missing" });
    }

    try {
        await verifyUser(token);
        return res.status(200).json({ message: "Email verified successfully" });

    } catch (err) {
        if (err.message === "Invalid or expired token" || err.message === "Verification token has expired") {
            return res.status(401).json({ msg: err.message });
        }
        return res.status(500).json({ msg: "Server msg during verification" });
    }
};

export const resendVerificationToken = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ msg: "Email is required" });
    }

    try {
        await updateVerificationToken(email);
        return res.status(200).json({ message: "Verification email resent successfully" });

    } catch (err) {
        if (err.message === "User not found") {
            return res.status(404).json({ msg: err.message });
        }
        if (err.message === "Email already verified") {
            return res.status(400).json({ msg: err.message });
        }
        console.msg("Error resending verification email:", err);
        return res.status(500).json({ msg: "Server msg" });
    }
};
