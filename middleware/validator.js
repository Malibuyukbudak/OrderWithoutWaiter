import pkg from "express-validator";
const { validationResult } = pkg;

export const validateRequestSchema = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            status: 422,
            message: errors.array().map((err) => req.t(err.msg))[0],
        });
    }
    next();
};
