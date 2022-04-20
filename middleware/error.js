export const NoDataFound = class extends Error {
  constructor() {
    super("error.rowNotFound");
  }
};

export const ErrorHandler = class extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
};

export const HandleError = (req, res, err) => {
  let { statusCode, message } = err;
  message = req.t(message);

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};
