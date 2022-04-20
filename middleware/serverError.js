import { ErrorHandler, HandleError } from "./error.js";

export const serverError = (err, req, res, next) => {
  if (err.constructor === ErrorHandler) {
    HandleError(req, res, err);
  } else if (err.constructor === NoDataFound) {
    HandleError(new ErrorHandler(400, req.t("error.notFound")), res);
  } else if (err.code === "ECONNREFUSED") {
    HandleError(
      new ErrorHandler(
        503,
        `${err.address}:${err.port} ${req.t("error.refusedConnection")}`
      ),
      res
    );
  } else {
    HandleError(new ErrorHandler(500, req.t("error.internalServer")), res);
  }
};

export const pageNotFound = function (req, res, next) {
  next(new ErrorHandler(404, req.t("error.pageNotFound")));
};
