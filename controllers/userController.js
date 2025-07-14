import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import { genrateToken } from '../utils/genrateToken.js'

export const signupController = async (req, res) => {
    try {
        // get data from frontend
        const { fullName, email, password } = req.body

        // check all fields are required
        if (!fullName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all fields"
            })
        }

        // email valid or not
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(422).json({
                success: false,
                message: "Invalid email"
            })
        }

        // check user exist or not
        const userExist = await User.findOne({ email })
        if (userExist) {
            return res.status(400).json({
                success: false,
                message: "User already exist"
            })
        }

        // hashed password
        const hashedPassword = await bcrypt.hash(password, 10)

        // create user
        const user = await User.create({
            fullName,
            email,
            password: hashedPassword
        })

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal error',
            error: error.message
        })
    }
}

export const loginController = async (req, res) => {
    try {
        // get data from frontend
        const { email, password } = req.body

        // check all fields are required
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all fields"
            })
        }

        // email valid or not
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(422).json({
                success: false,
                message: "Invalid email"
            })
        }

        // check user exist or not
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not exist"
            })
        }

        // check password match or not
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Password is not match"
            })
        }

        // genrate token
        const token = genrateToken(user)

        return res.cookie("token", token, { httpOnly: true, secure: true, sameSite:"none", maxAge: 7 * 24 * 60 * 60 * 1000 }).status(200).json({
            success: true,
            message: "Login Successfully",
            data: user
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal error',
            error: error.message
        })
    }
}

export const logoutController = (req, res) => {
    try {
        return res.cookie("token", "", { maxAge: 0 }).status(200).json({
            success: true,
            message: "Logout Successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal error',
            error: error.message
        })
    }
}