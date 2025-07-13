import express from "express"
import cors from "cors"
import connectToDb from "../server/config/db.js"
import cookieParser from "cookie-parser"
import userRoute from "../server/routes/userRoute.js"
import taskRoute from "../server/routes/taskRoute.js"

const app = express()
const PORT = process.env.PORT || 4001

// middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

// define routes with middleware
app.use('/api/auth', userRoute)
app.use('/api/task', taskRoute)

app.get('/',(req, res)=>{
    return res.json({
        message: "Welcome to the API"
    })
})

app.listen(PORT, ()=>{
    console.log(`Server is listening at the port ${PORT}`)
    connectToDb()
})