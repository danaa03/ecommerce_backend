import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken, generateEmailVerificationToken, existingUser } from "../services/jwt.services.js"
import { sendVerificationMail } from "../services/email.services.js";
import { getUserRepo, getCartRepo } from "../db/repo.js";

export const login = async(req,res) => {
    try {
        const {email, password} = req.body;
        const userRepo = getUserRepo();
        const user = await existingUser(email);
        if(!user)
        {
            return res.status(401).json({ error: 'Email not registered' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        
        if (user.verificationStatus !== "verified") {
            return res.status(403).json({ error: 'Please verify your email before logging in.' });
        }

        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);
        user.refreshToken = refreshToken;

        await userRepo.save(user);
        
        res.status(200).json({ accessToken, refreshToken });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({msg: "Server Error"});
    }
};

export const signup = async(req,res) => {
    try {
        const { email, name, password, confirmPassword, role, phone, profilePicture } = req.body;
        //check if email already exists

        if (await existingUser(email)) 
        {
            return res.status(400).json({ error: 'Email Already Exists' });
        }

        //check if passwords match
        if(confirmPassword!== password)
        {
            return res.status(400).json({ error: 'Passwords dont match' });
        }

        const {verificationToken, verificationTokenExpires} = generateEmailVerificationToken();
        const userRepo = getUserRepo();
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = userRepo.create({ email, name, password:hashedPassword, phone, profilePicture: profilePicture || null, role, verificationToken, verificationTokenExpires});
        const verificationUrl = `${process.env.FRONTEND_URL}/auth/verify-email?token=${verificationToken}`;

        await sendVerificationMail(verificationUrl, email);
        await userRepo.save(newUser);

        //create a cart and assign the cartId to the user
        const cartRepo = getCartRepo();
        const cart = {
            user: {id:newUser.id}
        };
        await cartRepo.save(cart);

        res.status(201).json({ message: 'Email sent for verification.', user: newUser });
    } catch (error) {
        console.log("Error during registeration: ", error);
        res.status(500).json({ error: 'Registration failed' });
    }
};

export const verifyEmail = async (req, res) => {
    const { token } = req.query;

    if (!token) {
        return res.status(400).json({ error: "Verification token missing" });
    }

    try {
        const userRepo = getUserRepo();
        const user = await userRepo.findOne({
            where: { verificationToken: token }
        });

        if (!user) {
            return res.status(400).json({ error: "Invalid or expired token" });
        }

        if (user.verificationTokenExpires < new Date()) {
            return res.status(400).json({ error: "Verification token has expired" });
        }

        user.verificationStatus = "verified"; 
        user.verificationToken = null;
        user.verificationTokenExpires = null;

        await userRepo.save(user);

        return res.status(200).json({ message: "Email verified successfully" });

    } catch (err) {
        console.error("Verification error:", err);
        return res.status(500).json({ error: "Server error during verification" });
    }
};

export const resendVerificationToken = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    try {
        const userRepo = getUserRepo();
        const user = await userRepo.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (user.verificationStatus === "verified") {
            return res.status(400).json({ error: "Email already verified" });
        }

        const { verificationToken, verificationTokenExpires } = generateEmailVerificationToken();

        user.verificationToken = verificationToken;
        user.verificationTokenExpires = verificationTokenExpires;

        await userRepo.save(user);

        const verificationUrl = `${process.env.FRONTEND_URL}/auth/verify-email?token=${verificationToken}`;
        await sendVerificationMail(verificationUrl, user.email);

        return res.status(200).json({ message: "Verification email resent successfully" });

    } catch (err) {
        console.error("Error resending verification email:", err);
        return res.status(500).json({ error: "Server error" });
    }
};
