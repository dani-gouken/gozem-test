#!/usr/bin/env node
import http from "http";
import "dotenv/config";

import { createApp } from "../src/app.js";
import { normalizePort } from "../src/helpers.js";
import { connect as connectionDatabase } from "../src/database/connection.js";
("../database.js");

const mongoose = await connectionDatabase();
const port = normalizePort(process.env.APP_PORT || "3000");
const app = createApp(mongoose);
app.set("port", port);

app.listen(port, () => {
  console.info("Listening on port " + port);
});
