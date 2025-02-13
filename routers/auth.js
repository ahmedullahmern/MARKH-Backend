import 'dotenv/config'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import sendResponse from '../helpers/sendResponse.js';
import express from 'express';
import { authenticationUser } from '../midelewear/authentication.js';
import User from '../models/auth.js';
import { loginSchema, registerSchema } from '../validation/authValidation.js';

const router = express.Router()

router.post("/register", async (req, res) => {
    const { error, value } = registerSchema.validate(req.body);
    if (error) return sendResponse(res, 400, null, true, error.message)
    const user = await User.findOne({ email: value.email })
    if (user) return sendResponse(res, 403, null, true, "User With This Email already Exist")
    const hashedPassword = await bcrypt.hash(value.password, 12)
    value.password = hashedPassword;
    let newUser = new User({ ...value });
    newUser = await newUser.save()
    sendResponse(res, 201, newUser, false, "User Register successfully")
})


router.post("/login", async (req, res) => {
    console.log("req.User==>", req.user)
    const { error, value } = loginSchema.validate(req.body);
    if (error) return sendResponse(res, 400, null, true, error.message)
    const user = await User.findOne({ email: value.email }).lean()
    if (!user) return sendResponse(res, 403, null, true, "User not Registered.")
    const isPasswordValid = await bcrypt.compare(value.password, user.password)
    if (!isPasswordValid) return sendResponse(res, 403, null, true, "Invalid  Credentails")
    var token = jwt.sign(user, process.env.AUTH_SECRET);
    sendResponse(res, 200, { user, token }, false, "User Login successfully")
})

router.get("/myInfo", authenticationUser, async (req, res) => {
    try {
        const user = await User.findOne({
            find: req.user.find
        })
        return sendResponse(res, 200, user, false, "Fetched Current User")
    } catch (error) {
        return sendResponse(res, 500, null, true, error.message)
    }
})

export default router