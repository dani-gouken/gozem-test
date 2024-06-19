import packageService from "../../../services/packageService.js";
import validateBody from "../../middlewares/validateBody.js";
import { updatePackageSchema } from "../../schema/packageSchema.js";

export default validateBody(
  updatePackageSchema,
  async function (req, res, next) {
    const doc = await packageService.update(req.params.id, req.body);
    if (!doc) {
      return res.status(404).send();
    }
    return res.json(doc);
  }
);
