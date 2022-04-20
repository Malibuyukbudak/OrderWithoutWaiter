import chai from "chai";
import chaiHttp from "chai-http";
import server from "../server.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./config/env/config.env",
});

const should = chai.should();
chai.use(chaiHttp);
describe("AUTHENTICATION", () => {
  const loginCompany ={
    companyName: process.env.COMPANY_NAME, 
    companyPassword: process.env.COMPANY_PASSWORD
  }
  it("{POST} /login", (done) => {
    chai
      .request(server)
      .post("/api/login")
      .send(loginCompany)
      .end((err, res) => {
        res.should.have.status(200);
        process.env.JWT_TOKEN = res.body.jwtToken;
        res.body.should.have.property("jwtToken");

        done();
      });
  });
});
