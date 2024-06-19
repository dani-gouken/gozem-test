import packageService from "../../../services/packageService.js";

export default async function (req, res, next) {
  const item = await packageService.find(req.params.id);
  if (!item) {
    return res.status(404).send();
  }
  return res.json(item);
}
