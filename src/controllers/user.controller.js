import { getUserRepo } from "../db/repo.js";
import bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken } from "../services/jwt.services.js";
import { generateEmailVerificationToken } from "../services/jwt.services.js";
import { sendVerificationMail } from "../services/email.services.js";

export const updateUser = async (req, res) => {
  try {
    let { name, phone, address } = req.body;
    console.log("request from frontend: ", req.body)
    const userId = req.userId;
    const userRepo = getUserRepo();

    const user = await userRepo.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (name !== undefined) 
      user.name = name;
    if (phone !== undefined) 
      user.phone = phone;
    if (address !== undefined) 
      user.address = address;

    let newUser = await userRepo.save(user);
    const responseUser = {};
    responseUser.name = newUser.name;
    responseUser.id = newUser.id;
    responseUser.email = newUser.email;
    responseUser.phone = newUser.phone;
    responseUser.address = newUser.address;

    res.status(200).json({ msg: "User details updated successfully", user:responseUser});
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "error updating user" });
  }
};

export const existingUser = async(email) =>
{
    const userRepo = getUserRepo();
    return await userRepo.findOne({ where: { email } });
};

export const userLogin = async (email, password) => {
    try{
        const userRepo = getUserRepo();
        const user = await existingUser(email);
        if(!user)
        {
            throw new Error('Email not registered');
        }
    
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error('Authentication failed');
        }
        
        if (user.verificationStatus !== "verified") {
            throw new Error('Please verify your email before logging in.');
        }
    
        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);
        user.refreshToken = refreshToken;
        user.accessToken = accessToken;
    
        await userRepo.save(user);
    
        const userResponse = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
            },
            accessToken,
            refreshToken,
        }
        return userResponse;
    } catch (err) {
        console.error(err);
        throw error;
    }
}

export const createUser = async(userDetails) => {
    try {
        const userRepo = getUserRepo();
        const {password, profilePicture, ...rest} = userDetails;
        const hashedPassword = await bcrypt.hash(password, 10);

        const {verificationToken, verificationTokenExpires} = generateEmailVerificationToken();
        
        const newUser = await userRepo.create({ ...rest, password: hashedPassword, profilePicture: profilePicture || null, verificationToken, verificationTokenExpires});
        const verificationUrl = `${process.env.FRONTEND_URL}/auth/verify-email?token=${verificationToken}`;
        
        await sendVerificationMail(verificationUrl, newUser.email);
        await userRepo.save(newUser);

        return newUser;

    } catch(err) {
        console.error(err);
        throw error;
    }
}

export const verifyUser = async(token) => {
    try {
        const userRepo = getUserRepo();
        const user = await userRepo.findOne({
            where: { verificationToken: token }
        });

        if (!user) { 
            throw new Error("Invalid or expired token" );
        }

        if (user.verificationTokenExpires < new Date()) {
            throw new Error("Verification token has expired" );
        }

        user.verificationStatus = "verified"; 
        user.verificationToken = null;
        user.verificationTokenExpires = null;

        await userRepo.save(user);

    } catch (err) {
        console.error(err);
        throw error;
    }
}

export const updateVerificationToken = async() => {
    try { 
        const userRepo = getUserRepo();
        const user = await userRepo.findOne({ where: { email } });

        if (!user) {
            throw new Error("User not found" );
        }

        if (user.verificationStatus === "verified") {
            throw new Error("Email already verified" );
        }

        const { verificationToken, verificationTokenExpires } = generateEmailVerificationToken();

        user.verificationToken = verificationToken;
        user.verificationTokenExpires = verificationTokenExpires;

        await userRepo.save(user);

        const verificationUrl = `http://localhost:5000/auth/verify-email?token=${verificationToken}`;
        await sendVerificationMail(verificationUrl, user.email);
    } catch (err) {
        console.error(err);
        throw err;
    }
}