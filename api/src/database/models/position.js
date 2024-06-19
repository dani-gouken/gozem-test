import mongoose from "mongoose";
export default new mongoose.Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
});
