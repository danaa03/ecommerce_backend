import AppDataSource from "../../data-source.js";
import User from "../db/entities/User.js";
import bcrypt from "bcrypt";
import {generateTokens, existingUser} from "../services/jwt.services.js"

export const login = async(req,res) => {
    try {
        console.log("login called");
        const {email, password} = req.body;
        const user = await existingUser(email);
        if(!user)
        {
            return res.status(401).json({ error: 'Email not registered' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed' });
        }

        const { accessToken, refreshToken } = generateTokens(user.id);

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

        const userRepo = AppDataSource.getRepository(User);
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = userRepo.create({ email, name, password:hashedPassword, phone, profilePicture: profilePicture || null, role, });
        await userRepo.save(newUser);
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.log("Error during registeration: ",error);
        res.status(500).json({ error: 'Registration failed' });
    }
};
