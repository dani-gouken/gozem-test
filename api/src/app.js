import express from "express";
import logger from "morgan";
import handleError from "./http/middlewares/handleError.js";
import registerRoutes from "./http/handlers/index.js";
import expressWs from "express-ws";
import cors from "cors";

export const createApp = (db) => {
  const app = express();
  const wss = expressWs(app);

  app.use(
    cors({
      origin: "*",
      allowedHeaders: "*",
    })
  );
  app.use(logger("dev"));
  app.use(express.json());
  app.use((req, res, next) => {
    req.broadcast = (msg) => {
      wss.getWss().clients.forEach((c) => c.send(JSON.stringify(msg)));
    };
    next();
  });
  app.use(express.urlencoded({ extended: false }));
  registerRoutes(app, wss);
  app.use(handleError);
  return app;
};
