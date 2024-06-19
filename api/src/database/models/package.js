import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import PositionSchema from "./position.js";

const packageSchema = new mongoose.Schema(
  {
    package_id: {
      type: String,
      required: true,
      unique: true,
    },
    active_delivery_id: {
      type: String,
      default: null,
    },
    description: { type: String, required: true },
    weight: { type: Number, required: true },
    width: { type: Number, required: true },
    depth: { type: Number, required: true },
    from_name: { type: String, required: true },
    from_location: { type: PositionSchema, required: true },
    from_address: { type: String, required: true },
    to_name: { type: String, required: true },
    to_location: { type: PositionSchema, required: true },
    to_address: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Package", packageSchema);
