import express from 'express'
import morgan from 'morgan'
import 'dotenv/config'
import cors from 'cors'
import authRoutes from './routers/auth.js'
import blogRoute from './routers/blog.js'
import mongoose from 'mongoose'

const app = express()
const PORT = 4000

console.log("MONGODBURI==>", process.env.MONGODBURI)
app.use(cors())
app.use(express.json())
app.use(morgan("tiny"));
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/blog', blogRoute)

mongoose.connect(process.env.MONGODBURI).then(() => console.log("mongodb connected"))
    .catch((e) => console.log("error==>", e))


app.get("/", (req, res) => {
    // console.log("req=>", req.reqByAhmed)
    res.send("Hello Backend")
})


app.listen(PORT || 4000, () => console.log("Server Is Running PORT" + PORT))