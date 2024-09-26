import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password } = req.body;
        if (!fullname || !email || !phoneNumber || !password) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exists with this email",
                success: false,
            });
        }
        const hashedpassword = await bcrypt.hash(password, 10);
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedpassword,
        });

        return res.status(201).json({
            message: "Account created successfully",
            success: true
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false,
            });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false,
            });
        }


        const tokenData = {
            userId: user._id
        }

        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
}


export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully",
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
}
