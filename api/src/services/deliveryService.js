import DeliveryModel, { DeliveryStatus } from "../database/models/delivery.js";
import PackageModel from "../database/models/package.js";
import ValidationError from "../errors/validationError.js";

async function store(pckg, data) {
  const delivery = await DeliveryModel.create({
    status: DeliveryStatus.open,
    package_id: pckg.package_id,
    location: pckg.to_location,
    ...data,
  });
  await PackageModel.where({
    package_id: pckg.package_id,
  }).updateOne({
    active_delivery_id: delivery.delivery_id,
  });
  return find(delivery.delivery_id);
}

function getStatusUpdate(delivery, newStatus) {
  const previousStatus = delivery.status;
  console.log(delivery.status);
  if (
    previousStatus == DeliveryStatus.failed ||
    previousStatus == DeliveryStatus.delivered
  ) {
    throw new ValidationError("delivery is already in a final status");
  }
  if (
    newStatus == DeliveryStatus.pickedUp &&
    previousStatus == DeliveryStatus.open
  ) {
    return {
      pickup_time: new Date(),
    };
  }
  if (
    newStatus == DeliveryStatus.inTransit &&
    previousStatus == DeliveryStatus.pickedUp
  ) {
    return {
      start_time: new Date(),
    };
  }
  if (
    newStatus == DeliveryStatus.delivered &&
    previousStatus == DeliveryStatus.inTransit
  ) {
    return {
      end_time: new Date(),
    };
  }
  if (
    (newStatus == DeliveryStatus.inTransit &&
      previousStatus == DeliveryStatus.delivered) ||
    newStatus == DeliveryStatus.failed
  ) {
    return {
      end_time: new Date(),
    };
  }
  throw new ValidationError("Invalid transition");
}

async function update(deliveryId, data) {
  const delivery = await DeliveryModel.findOne({ delivery_id: deliveryId });
  if (!delivery) return delivery;

  let updates = data;
  if (data.status) {
    updates = {
      ...updates,
      ...getStatusUpdate(delivery, data.status),
    };
  }
  await delivery.updateOne(updates);
  return find(deliveryId);
}

async function all() {
  return await DeliveryModel.aggregate([
    {
      $lookup: {
        from: "packages",
        localField: "package_id",
        foreignField: "package_id",
        as: "package",
      },
    },
    { $sort: { createdAt: -1 } },
    {
      $unwind: {
        path: "$package",
      },
    },
  ]);
}

async function find(deliveryId) {
  return await DeliveryModel.aggregate([
    [
      { $match: { delivery_id: deliveryId } },
      {
        $lookup: {
          from: "packages",
          localField: "package_id",
          foreignField: "package_id",
          as: "package",
        },
      },
      { $limit: 1 },
      {
        $unwind: {
          path: "$package",
        },
      },
    ],
  ]).then((v) => (v.length == 0 ? null : v[0]));
}

/**
 * @param {string} packageId
 * @returns {boolean}
 */
async function destroy(packageId) {
  const deleted = await DeliveryModel.deleteOne({
    delivery_id: packageId,
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
