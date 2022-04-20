import { NoDataFound } from "../middleware/error.js";
import pool from "./pgConnection.js";

export function hasRows(result) {
  return new Promise((resolve, reject) => {
    if (result && result.rowCount > 0) {
      resolve(result);
    } else {
      reject(new NoDataFound());
    }
  });
}

export async function executeQuery(client, query, values) {
  return await client.query(query, values);
}

export function getRows(result) {
  return new Promise((resolve) => {
    resolve(result.rows);
  });
}

export function releaseClient(client) {
  if (client !== undefined) {
    client.release();
  }
}

export async function getClient() {
  return await pool.connect();
}
