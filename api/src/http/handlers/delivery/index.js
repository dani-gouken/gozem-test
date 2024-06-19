import express from "express";
import Joi from "joi";
import validatePathParams from "../../middlewares/validatePathParams.js";
import async from "../../middlewares/async.js";
import indexHandler from "./indexHandler.js";
import storeHandler from "./storeHandler.js";
import getHandler from "./getHandler.js";
import deleteHandler from "./deleteHandler.js";
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
    .post("/", async(storeHandler))
    .get("/", async(getHandler))
    .delete("/", async(deleteHandler))
    .put("/", async(updateHandler))
);
export default router;
