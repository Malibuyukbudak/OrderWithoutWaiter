import {
  executeQuery,
  getClient,
  getRows,
  hasRows,
  releaseClient,
} from "../database/pgclient.js";
import { ErrorHandler } from "../middleware/error.js";
import { LOGIN } from "../repository/queries.js";
import { generateAccessToken } from "../utils/authentication.js";

export const login = async (req, res, next) => {
  try {
    let { companyName, companyPassword } = req.body;
    var client = await getClient();
    let rest = await executeQuery(client, LOGIN, [
      companyName,
      companyPassword,
    ]);
    rest = await hasRows(rest);
    rest = await getRows(rest);

    res.json({
      jwtToken: generateAccessToken(rest),
    });
  } catch (error) {
    next(new ErrorHandler(error.status || 404, error.message));
  } finally {
    releaseClient(client);
  }
};
