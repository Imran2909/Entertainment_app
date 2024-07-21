const jwt = require("jsonwebtoken")

const authenticate = (req, res, next) => {
    const token = req.headers.authorization
    if (token) {
        jwt.verify(token, 'imran', (err, decoded) => {
            if (decoded) {
                console.log(decoded)
                next()
            } else {
                res.send("Login failed")
            }
        });
    } else {
        res.send("Please login")
    }
}

module.exports = {
    authenticate
}