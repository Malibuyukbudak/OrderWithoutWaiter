import express from "express";
import dotenv from "dotenv";
import i18next from "i18next";
import Backend from "i18next-fs-backend";
import middleware from "i18next-http-middleware";
import api from "./routers/index.js";
import http from "http";
import logger from "morgan";
import { pageNotFound, serverError } from "./middleware/serverError.js";

dotenv.config({
  path: "./config/env/config.env",
});

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: "tr",
    backend: {
      loadPath: "./utils/locales/{{lng}}/translation.json",
    },
  });

const app = express();

app.use(middleware.handle(i18next));
app.use(express.json());
app.use(logger("dev"));
app.use("/api", api);
app.use(pageNotFound);
app.use(serverError);

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log(server.address());
});

export default server;
