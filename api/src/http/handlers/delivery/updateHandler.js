import deliveryService from "../../../services/deliveryService.js";
import validateBody from "../../middlewares/validateBody.js";
import { updateDeliverySchema } from "../../schema/deliverySchema.js";

export default validateBody(
  updateDeliverySchema,
  async function (req, res, next) {
    const doc = await deliveryService.update(req.params.id, req.body);
    if (!doc) {
      return res.status(404).send();
    }
    req.broadcast({
      event: "delivery_updated",
      payload: doc,
    });
    return res.json(doc);
  }
);
