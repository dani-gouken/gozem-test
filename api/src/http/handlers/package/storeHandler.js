import packageService from "../../../services/packageService.js";
import validateBody from "../../middlewares/validateBody.js";
import packageSchema from "../../schema/packageSchema.js";

export default validateBody(packageSchema, async function (req, res, next) {
  return res.json(
    await packageService.store({
      package_id: req.params.id,
      ...req.body,
    })
  );
});
