import mongoose from "mongoose"
// import { configDotenv } from "dotenv"
// configDotenv()
import dotenv from "dotenv"
dotenv.config()


const connectToDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(conn.connection.host)
        console.log("Database connected successfully")
    } catch (error) {
        console.log("Database connection failed")
        console.error(error)
        process.exit(1)
    }
}

export default connectToDb