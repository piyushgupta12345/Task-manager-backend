import jwt from "jsonwebtoken"

export const genrateToken = (user) => {
    const payload = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email
    }

    return jwt.sign(payload, process.env.JWT_SECRET_KEY , {expiresIn:'24h'})
}