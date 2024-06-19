import express from "express";
import getHandler from "./getHandler.js";
import storeHandler from "./storeHandler.js";
import indexHandler from "./indexHandler.js";
import deleteHandler from "./deleteHandler.js";
import Joi from "joi";
import validatePathParams from "../../middlewares/validatePathParams.js";
import updateHandler from "./updateHandler.js";

const router = express.Router({ mergeParams: true });

router.get("/", indexHandler);
router.use(
  "/:id",
  express
    .Router({ mergeParams: true })
    .use(
      validatePathParams({
        id: Joi.string().uuid().required(),
      })
    )
    .post("/", storeHandler)
    .put("/", updateHandler)
    .delete("/", deleteHandler)
    .get("/", getHandler)
);
export default router;
