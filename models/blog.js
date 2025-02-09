import mongoose from "mongoose";
const { Schema } = mongoose;

const blogPostSchema = new Schema({
    title: { type: String, },
    description: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true })

const Blog = mongoose.model("blogpost", blogPostSchema)
export default Blog