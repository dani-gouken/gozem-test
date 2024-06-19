import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import PositionSchema from "./position.js";

export const DeliveryStatus = {
  open: "open",
  pickedUp: "picked-up",
  inTransit: "in-transit",
  delivered: "delivered",
  failed: "failed",

  cases() {
    return [
      this.open,
      this.pickedUp,
      this.inTransit,
      this.delivered,
      this.failed,
    ];
  },
};
const deliverySchema = new mongoose.Schema(
  {
    delivery_id: {
      type: String,
      required: true,
      unique: true,
      default: uuidv4,
    },
    package_id: {
      type: String,
      required: true,
    },
    pickup_time: { type: Date, default: null },
    start_time: { type: Date, default: null },
    end_time: { type: Date, default: null },
    location: { type: PositionSchema, required: true },
    status: { type: String, enum: DeliveryStatus.cases(), default: "user" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Delivery", deliverySchema);
