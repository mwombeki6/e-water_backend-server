import { Request, Response } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import User from "../models/user";

export const registerUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email: email })

        if (userExists) {
            return res.status(400).json({ msg: "User already exists" });
        }

        const user = new User({
            name,
            email,
            password: bcrypt.hashSync(password, 10)
        })

        await user.save();

        if (process.env.JWT_SECRET) {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: '1h'
            })

            res.status(201).json({ token: token })
        } else {
            res.status(500).json({ msg: 'Server error: No JWT secret provided' })
        }
    } catch (err) {
        res.status(500).json({ msg: 'Server error' })
    }
}

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        const isMatch = bcrypt.compareSync(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: "Incorrect password" });
        }

        if (process.env.JWT_SECRET) {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: '1h'
            })

            res.json({ token: token })
        } else {
            res.status(500).json({ msg: 'Server error: No JWT secret provided' })
        }
    } catch (err) {
        res.status(500).json({ msg: 'Server error' })
    }
}