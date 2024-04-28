import { TokenExpiredError, verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { jwtDecode } from "jwt-decode";

interface AuthRequest extends Request {
  user: { name: string; email: string };
}
type TokenType = {
  name: string;
  email: string;
};

export default function authToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.json({ error: true, message: "User is not logged" });
  verify(token, process.env.JWT_SECRET as string, (error, user) => {
    if (error) {
      if (error instanceof TokenExpiredError) {
        const decoded = jwtDecode(token) as TokenType;
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
    req.user = user as TokenType;
    next();
  });
}
