import deliveryService from "../../../services/deliveryService.js";

export default async function (req, res, next) {
  const deliveries = await deliveryService.all();
  return res.json(deliveries);
}
