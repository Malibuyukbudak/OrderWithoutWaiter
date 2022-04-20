import {
  executeQuery,
  getClient,
  getRows,
  hasRows,
  releaseClient,
} from "../database/pgclient.js";
import { ErrorHandler } from "../middleware/error.js";
import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  GET_ALL_PRODUCT,
  GET_PRODUCT,
  GET_PRODUCT_TYPE,
  UPDATE_PRODUCT,
} from "../repository/queries.js";

export const addProduct = async (req, res, next) => {
  try {
    let { productType, productName, productSalary } = req.body;
    var client = await getClient();
    let companyId = req.company.data[0].id;
    let companyName = req.company.data[0].company_name;
    let rest = await executeQuery(client, ADD_PRODUCT, [
      companyId,
      productType,
      productName,
      productSalary,
    ]);
    rest = await hasRows(rest);
    rest = await getRows(rest);

    let productTypeName = await executeQuery(client, GET_PRODUCT_TYPE, [
      productType,
    ]);
    productTypeName = await hasRows(productTypeName);
    productTypeName = await getRows(productTypeName);
    productTypeName = productTypeName[0].product_type_name;
      res.json({
        message: req.t("product.addProduct"),
        data: { companyName, productTypeName, productName, productSalary },
      });
  } catch (error) {
    next(new ErrorHandler(error.status || 404, error.message));
  } finally {
    releaseClient(client);
  }
};

export const getAllProduct = async (req, res, next) => {
  try {
    var client = await getClient();
    let companyId = req.company.data[0].id;
    let getAllProduct = await executeQuery(client, GET_ALL_PRODUCT, [
      companyId,
    ]);
    getAllProduct = await hasRows(getAllProduct);
    getAllProduct = await getRows(getAllProduct);

    res.json({
      data: getAllProduct,
    });
  } catch (error) {
    next(new ErrorHandler(error.status || 404, error.message));
  } finally {
    releaseClient(client);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    var client = await getClient();
    let { productId, productType, productName, productSalary } = req.body;

    let getProduct = await executeQuery(client, GET_PRODUCT, [productId]);
    getProduct = await hasRows(getProduct);
    getProduct = await getRows(getProduct);

    if (productType == null) productType = getProduct[0].product_type;
    else if (productName == null) productName = getProduct[0].product_name;
    else if (productSalary == null)
      productSalary = getProduct[0].product_salary;

    await executeQuery(client, UPDATE_PRODUCT, [
      productId,
      productName,
      productSalary,
      productType,
    ]);

    res.json({
      message: req.t("product.updateProduct"),
      data: { productId, productName, productSalary, productType },
    });
  } catch (error) {
    next(new ErrorHandler(error.status || 404, error.message));
  } finally {
    releaseClient(client);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    var client = await getClient();
    let { productId } = req.query;

    let getProduct = await executeQuery(client, GET_PRODUCT, [productId]);
    getProduct = await hasRows(getProduct);
    getProduct = await getRows(getProduct);

    await executeQuery(client, DELETE_PRODUCT, [productId]);

    res.json({
      message: req.t("product.deleteProduct"),
      data: getProduct,
    });
  } catch (error) {
    next(new ErrorHandler(error.status || 404, error.message));
  } finally {
    releaseClient(client);
  }
};
