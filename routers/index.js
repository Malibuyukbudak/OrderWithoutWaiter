import express from "express";
import login from "../routers/login.js";
import product from "../routers/product.js";

const router = express.Router();

router.use(login);
router.use(product);

export default router;
