import pkg from "express-validator";
const { body, query } = pkg;

export const loginValidation = () => {
    return [
        body("companyName").isLength({ min: 2 }).withMessage("validation.companyName"),
        body("companyPassword").isLength({ min: 2 }).withMessage("validation.companyPassword")
    ];
};

export const addProductValidation = () => {
    return [
        body("productType").isInt().withMessage("validation.productType"),
        body("productName").isString().withMessage("validation.productName"),
        body("productSalary").isInt().withMessage("validation.productSalary")
    ];
};

export const deleteProductValidation = () => {
    return [
        query("productId").isInt().withMessage("validation.productId")
    ];
};
