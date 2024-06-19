import mongoose from "mongoose";
import "dotenv/config";

export function connect() {
    return mongoose.connect(
    process.env.DB_URL
  );
}
