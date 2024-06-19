import deliveryService from "../../../services/deliveryService.js";
import packageService from "../../../services/packageService.js";
import validateBody from "../../middlewares/validateBody.js";
import { storeDeliverySchema } from "../../schema/deliverySchema.js";

export default validateBody(
  storeDeliverySchema,
  async function (req, res, next) {
    const pckg = await packageService.find(req.body.package_id);
    if (!pckg) {
      return res.status(400).json({
        message: "Package not found",
      });
    }
    return res.json(
      await deliveryService.store(pckg, {
        delivery_id: req.params.id,
        ...req.body,
      })
    );
  }
);
