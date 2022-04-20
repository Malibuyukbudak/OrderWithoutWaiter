import chai from "chai";
import chaiHttp from "chai-http";
import server from "../server.js";

chai.use(chaiHttp);
//const should = chai.should();
import dotenv from "dotenv";

dotenv.config({
  path: "./config/env/config.env",
});

describe("PRODUCT CRUD", () => {
  const addProduct = {
    productType: process.env.PRODUCT_TYPE_ADD,
    productName: process.env.PRODUCT_NAME_ADD,
    productSalary: process.env.PRODUCT_SALARY_ADD,
  };
  it("{POST} /add_product", (done) => {
    chai
      .request(server)
      .post("/api/add_product")
      .auth(process.env.JWT_TOKEN, { type: "bearer" })
      .send(addProduct)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it("{GET} /all_product", (done) => {
    chai
      .request(server)
      .get("/api/all_product")
      .auth(process.env.JWT_TOKEN, { type: "bearer" })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it("{PUT} /update_product", (done) => {
    const updateProduct = {
      productId: process.env.PRODUCT_ID_UPDATE,
      productType: process.env.PRODUCT_TYPE_UPDATE,
      productName: process.env.PRODUCT_NAME_UPDATE,
      productSalary: process.env.PRODUCT_SALARY_UPDATE,
    };
    chai
      .request(server)
      .put("/api/update_product")
      .auth(process.env.JWT_TOKEN, { type: "bearer" })
      .send(updateProduct)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it("{DELETE} /delete_product", (done) => {
    const deleteProduct = {
      productId: process.env.PRODUCT_ID_DELETE,
    };
    chai
      .request(server)
      .delete("/api/delete_product")
      .auth(process.env.JWT_TOKEN, { type: "bearer" })
      .query(deleteProduct)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
