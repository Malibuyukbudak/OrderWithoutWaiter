import { authenticateToken } from "../utils/authentication.js";
import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProduct,
  updateProduct,
} from "../controllers/product.js";
import { addProductValidation } from "../repository/validatorRequest.js";
import { validateRequestSchema } from "../middleware/validator.js";

const router = express.Router();

router.post("/add_product", addProductValidation(), validateRequestSchema,authenticateToken, addProduct);
router.get("/all_product", authenticateToken, getAllProduct);
router.put("/update_product", authenticateToken, updateProduct);
router.delete("/delete_product", authenticateToken, deleteProduct);

export default router;
