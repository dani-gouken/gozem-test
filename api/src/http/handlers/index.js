import packageRouter from "./package/index.js";
import deliveryRouter from "./delivery/index.js";
import wsRouter from "./ws/index.js";

export default function registerRoutes(app) {
  app.use("/api/package", packageRouter);
  app.use("/api/delivery", deliveryRouter);

  app.use("/ws", wsRouter(app));
}
