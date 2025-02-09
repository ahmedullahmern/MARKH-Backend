import express from "express"
import sendResponse from "../helpers/sendResponse.js";
import Blog from "../models/blog.js";
import { blogPostSchema } from "../validation/authValidation.js";
import { authenticationUser } from "../midelewear/authentication.js";

const router = express.Router()

router.post("/blogpost", authenticationUser, async (req, res) => {
    const { error, value } = blogPostSchema.validate(req.body);
    if (error) return sendResponse(res, 404, null, true, error.message)
    let newBlog = await new Blog({ ...value, userId: req.user._id })
    newBlog = await newBlog.save()
    sendResponse(res, 201, newBlog, false, "Blog Post Successfully")
})

router.get("/getallblog", async (req, res) => {
    const AllBlog = await Blog.find()
    sendResponse(res, 200, AllBlog, false, "Fetched All Blogs")
})

router.get("/getcurentuserblog", authenticationUser, async (req, res) => {
    try {
        console.log("User from Token:", req.user);
        const AllBlog = await Blog.find({ userId: req.user._id });

        if (!AllBlog.length) {
            return sendResponse(res, 404, null, true, "No Blogs Found for This User");
        }

        sendResponse(res, 200, AllBlog, false, "Fetched Current User Blogs");
    } catch (error) {
        sendResponse(res, 500, null, true, "Internal Server Error");
    }
});



export default router