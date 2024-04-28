"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const jwt_decode_1 = require("jwt-decode");
function authToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token)
        return res.json({ error: true, message: "User is not logged" });
    (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET, (error, user) => {
        if (error) {
            if (error instanceof jsonwebtoken_1.TokenExpiredError) {
                const decoded = (0, jwt_decode_1.jwtDecode)(token);
                const user = {
                    name: decoded.name,
                    email: decoded.email,
                    isExpired: true,
                };
                req.user = user;
                return next();
            }
            return res.json({ error: true, message: "User not found" });
        }
        req.user = user;
        next();
    });
}
exports.default = authToken;
