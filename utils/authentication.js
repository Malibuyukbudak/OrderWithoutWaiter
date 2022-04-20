import jwt from "jsonwebtoken";
const { verify } = jwt;
import { ErrorHandler } from "../middleware/error.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./config/env/config.env",
});

export function generateAccessToken(data) {
  return jwt.sign({ data }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
}

export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.company = user;
    next();
  });
}
