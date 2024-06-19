import packageService from "../../../services/packageService.js";

export default async function (req, res) {
  const deleted = await packageService.destroy(req.params.id);
  return res.status(deleted > 0 ? 200 : 404).send();
}
