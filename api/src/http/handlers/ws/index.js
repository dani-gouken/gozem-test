import express from "express";
import updatesHandler from "./updatesHandler.js";
export default function (app) {
  const router = express.Router();
  router.ws("/updates", updatesHandler);

  return router;
}
