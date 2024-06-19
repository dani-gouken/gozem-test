import deliveryService from "../../../services/deliveryService.js";

export default async function (req, res) {
  const deleted = await deliveryService.destroy(req.params.id);
  return res.status(deleted > 0 ? 200 : 404).send();
}
