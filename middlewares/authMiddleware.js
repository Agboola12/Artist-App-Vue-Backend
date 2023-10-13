const jwt = require("jsonwebtoken");
require("dotenv").config();


const verifyToken = (req, res, next) => {
    // const token = req.headers['authorization'];
    // if (!token)
    //     return res.status(401)
    //         .send('Unauthorized');

    // jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    //     if (err)
    //         return res.status(403)
    //         .send('Forbidden');
    //         req.user = user;
    //         next();
    // });

    jwt.verify(
        req.headers.authorization,
        process.env.JWT_SECRET,
        (err, data) => {
            if (err) {
                res.status(401).json({
                    success: false,
                    message: "Invalid token"
                })
            } else {
                req.user = data;
                next();
            }

        })
}

module.exports = { verifyToken }