import express from "express";
import { login } from "../controllers/login.js";
import { validateRequestSchema } from "../middleware/validator.js";
import {loginValidation} from "../repository/validatorRequest.js"
const router = express.Router();

router.post("/login",loginValidation(),validateRequestSchema ,login);

export default router;
