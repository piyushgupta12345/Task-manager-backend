import jwt from "jsonwebtoken";

export const isAuthenticate = (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Please login to access this resource'
            })
        }

        // decode
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = decode

        next()
    } catch (error) {
        return res.status(500),json({
            success: false,
            message: 'Internal Server Error in Authraization'
        })
    }
}