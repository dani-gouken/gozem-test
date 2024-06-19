import packageService from "../../../services/packageService.js";

export default async function (req, res, next) {
  const packages = await packageService.all();
  return res.json(packages);
}
