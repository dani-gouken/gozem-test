import deliveryService from "../../../services/deliveryService.js";
import {
  locationChangedSchema,
  eventSchema,
  statusChangedSchema,
} from "../../schema/eventSchema.js";

export default function (ws, req) {
  ws.on("message", async function (msg) {
    try {
      const data = JSON.parse(msg);
      let { value: event, error } = eventSchema.validate(data);
      if (error) {
        ws.send(JSON.stringify({ ack: false, message: error.message }));
        return;
      }
      switch (event.event) {
        case "location_changed":
          await handleLocationChanged(event, ws, req);
          break;
        case "status_changed":
          await handleStatusChanged(event, ws, req);
          break;
        default:
          ws.send(JSON.stringify({ ack: false, message: "unknown event" }));
      }
    } catch (e) {
      console.error(e);
      ws.send(JSON.stringify({ ack: false, message: "Server error" }));
    }
  });
}

async function handleLocationChanged(event, ws, req) {
  const { value: payload, error } = locationChangedSchema.validate(
    event.payload
  );
  if (error) {
    ws.send(JSON.stringify({ ack: false, message: error.message }));
    return;
  }
  const updated = await deliveryService.update(payload.delivery_id, {
    location: payload.location,
  });
  if (!updated) {
    ws.send(JSON.stringify({ ack: false, message: "not found" }));
    return;
  }
  req.broadcast({
    event: "delivery_updated",
    payload: updated,
  });
  ws.send(JSON.stringify({ ack: true, message: "ok" }));
}

async function handleStatusChanged(event, ws, req) {
  const { value: payload, error } = statusChangedSchema.validate(event.payload);
  if (error) {
    ws.send(JSON.stringify({ ack: false, message: error.message }));
    return;
  }
  const updated = await deliveryService.update(payload.delivery_id, {
    status: payload.status,
  });
  if (!updated) {
    ws.send(JSON.stringify({ ack: false, message: "not found" }));
    return;
  }
  req.broadcast({
    event: "delivery_updated",
    payload: updated,
  });
  ws.send(JSON.stringify({ ack: true, message: "ok" }));
}
