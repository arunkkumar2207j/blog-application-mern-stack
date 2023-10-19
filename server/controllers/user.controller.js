import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Token from "../models/token.js";

dotenv.config();

export const signupUser = async (req, res) => {
    const hasPassword = await bcrypt.hash(req.body.password, 10);
    const user = {
        name: req.body.name,
        username: req.body.username,
        password: hasPassword
    };
    try {
        const newUser = new User(user);
        await newUser.save();
        return res.status(200).json({message: "Signup Successfull"})
    } catch (error) {
        res.status(500).json({message: `Error while signup`});        
    }
}

export const loginUser = async(req, res) => {
    let user = await User.findOne({username: req.body.username})
    if(!user) {
        return res.status(400).json({message: "username does not exist"})
    }   
    try {
        let match = await bcrypt.compare(req.body.password, user.password)
        if(match) {
            const accessToken = jwt.sign(user.toJSON(), process.env.SECRET_ACCESS_KEY, { expiresIn: "15m"});
            const refreshToken = jwt.sign(user.toJSON(), process.env.SECRET_REFRESH_KEY);

            const newToken = new Token({token: refreshToken})
            await newToken.save();

            res.status(200).json({accessToken: accessToken, refreshToken:refreshToken, name: user.name, username: user.username});

        } else {
            res.status(400).json({message: "Password does not match"})
        }
    } catch (error) {
        res.status(500).json({message: `Error while login`});
    }
}