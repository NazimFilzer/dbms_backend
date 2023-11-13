const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const auth = asyncHandler(async (req, res, next) => {
    try {
        let token;
        let authHeader = req.headers.Authorization || req.headers.authorization;

        if (authHeader && authHeader.startsWith("Bearer")) {
            token = authHeader.split(" ")[1];
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(401).json({
                        success: false,
                        error: 'Unauthorized - token failed',
                    })
                }
                req.user = decoded.payload;
                console.log("LoggedIn User Info", req.user);
                next();
            });
        }
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No Verification Token",
                data: null,
            });
        }

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Auth failed",
            data: null,
        });
    }


});

module.exports = auth;