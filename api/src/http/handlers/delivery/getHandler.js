import deliveryService from "../../../services/deliveryService.js";

export default async function (req, res, next) {
  const item = await deliveryService.find(req.params.id);
  if (!item) {
    return res.status(404).send();
  }
  return res.json(item);
}
