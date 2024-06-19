import PackageModel from "../database/models/package.js";

async function store(data) {
  const pckg = await PackageModel.create(data);
  return find(pckg.package_id);
}

async function update(packageId, data) {
  const pckg = await PackageModel.findOne({ package_id: packageId });
  if (!pckg) return delivery;

  await pckg.updateOne(data);
  return find(packageId);
}

async function all() {
  return await PackageModel.aggregate([
    {
      $lookup: {
        from: "deliveries",
        localField: "active_delivery_id",
        foreignField: "delivery_id",
        as: "active_delivery",
      },
    },
    { $sort: { createdAt: -1 } },
    {
      $unwind: {
        path: "$active_delivery",
        preserveNullAndEmptyArrays: true,
      },
    },
  ]);
}

async function find(packageId) {
  return await PackageModel.aggregate([
    { $match: { package_id: packageId } },
    {
      $lookup: {
        from: "deliveries",
        localField: "active_delivery_id",
        foreignField: "delivery_id",
        as: "active_delivery",
      },
    },
    { $limit: 1 },
    { $sort: { createdAt: -1 } },
    {
      $unwind: {
        path: "$active_delivery",
        preserveNullAndEmptyArrays: true,
      },
    },
  ]).then((v) => (v.length == 0 ? null : v[0]));
}

/**
 * @param {string} packageId
 * @returns {boolean}
 */
async function destroy(packageId) {
  const deleted = await PackageModel.deleteOne({
    package_id: packageId,
  });
  return deleted.deletedCount > 0;
}

export default {
  store,
  destroy,
  find,
  all,
  update,
};
